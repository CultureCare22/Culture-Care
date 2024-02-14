from flask import Flask, request, jsonify
from sql_db import sql_db, Practitioner, Language, Location, Gender, Specialization
import email_automater
from email_media import create_pdf, split_string
import json
db_filename = "culturecaresql.db"
app = Flask(__name__)
import crud
import os
from dotenv import load_dotenv, find_dotenv
from flask_cors import CORS, cross_origin
from pprint import pprint
load_dotenv(find_dotenv())

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///%s" % db_filename
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True


CORS(app, support_credentials=True)


sql_db.init_app(app)
with app.app_context():
    sql_db.drop_all()
    sql_db.create_all()


def assert_none(data):
    """
    Returns True if any item in data is None else False

    Precond data: is a list of items of any type
    """
    for content in data:
        if content is None:
            return True
    return False

def success_response(data, code = 200):
    """
    Generalized success response function
    """
    return json.dumps(data), code

def failure_response(data, code = 404):
    """
    Generalized failure response function
    """
    return json.dumps({"error" : data}), code

def get_automatic_email_response():
    """
    Retrieves and returns pre-written email response written by practitioner
    """


@app.route("/emails/prewritten/create/", methods = ["POST"])
def create_prewritten_email():
    """
    Endpoint to create prewritten emails by practitioner
    """
    body = json.loads(request.data)
    subject = body.get("subject")
    message = body.get("message")
    practitioner_id = body.get("practitioner_id")

    if assert_none([subject, message, practitioner_id]):
        return failure_response("Insufficient inputs", 400)
    
    success, practitioner = crud.get_practitioner_by_id(practitioner_id)

    if not success:
        return failure_response("Practitioner does not exists", 400)
    
    created, email_content = crud.create_email_content(subject, message, practitioner_id, [])

    if not created:
        return failure_response("Failed to create email", 400)
    

    sql_db.session.add(email_content)
    sql_db.session.commit()
    
    return success_response(email_content.serialize(), 201)
    

@app.route("/emails/prewritten/send/<int:email_id>/", methods = ["POST"])
def send_prewritten_email(email_id):
    """
    Endpoint to send prewritten emails from practitioner to patient

    Precond email_id: is the email id of the email to be sent(integer)
    """
    body = json.loads(request.data)

    practitioner_id = body.get("practitioner_id")
    patient_id = body.get("patient_id")

    if assert_none([practitioner_id, patient_id]):
        return failure_response("Insufficient inputs")
    
    success, patient = crud.get_patient_by_id(patient_id)
    if not success:
        return failure_response("Patient does not exists")
    success, practitioner = crud.get_practitioner_by_id(practitioner_id)
    if not success:
            return failure_response("Practitioner does not exists")
    success, email_content = crud.get_emailcontent_by_id(email_id)
    if not success:
            return failure_response("Email does not exists")
    
    if email_content.practitioner_id != practitioner.id:
        return failure_response("No permission")
    
    sender = os.environ.get("GMAIL_SENDER")
    sent, message = email_automater.send_email(email_content.message,
                                               email_content.subject, 
                                               sender, patient.email_address, 
                                               email_content.media, 
                                               email_content.media_type, 
                                               email_content.file_name)

    if not sent:
        return failure_response(message)
    
    return success_response({"message" : message,
                             "from" : practitioner_id,
                             "to" : patient_id
                             })


@app.route("/patients/create/", methods = ["POST"])
def create_patient():
    """
    Endpoint to create patient
    """
    body = json.loads(request.data)
    name = body.get("name")
    email_address = body.get("email_address")

    if assert_none([name, email_address]):
        return failure_response("Insufficient inputs", 400)


    created, patient = crud.create_patient(name, email_address)

    if not created:
        return failure_response("Failed to create practitioner", 400)
    
    sql_db.session.add(patient)
    sql_db.session.commit()
    
    return success_response(patient.serialize(), 201)


# @app.route("/practitioners/create/", methods = ["POST"])
# def create_practitioner():
#     """
#     Endpoint to create practitioner
#     """
#     body = json.loads(request.data)
#     name = body.get("name")
#     email_address = body.get("email_address")

#     if assert_none([name, email_address]):
#         return failure_response("Insufficient inputs", 400)
    
#     created, practitioner = crud.create_practitioner(name, email_address)

#     if not created:
#         return failure_response("Failed to create email", 400)
    
#     sql_db.session.add(practitioner)
#     sql_db.session.commit()
    
#     return success_response(practitioner.serialize(), 201)

@app.route("/practitioners/create/", methods = ["POST"])
def create_practitioner():
    """
    Endpoint to create practitioner
    """
    body = json.loads(request.data)
    name = body.get("name")
    email_address = body.get("email_address")
    specializations= body.get("specializations")
    languages = body.get("languages")

    if assert_none([name, email_address]):
        return failure_response("Insufficient inputs", 400)
    
    created, practitioner = crud.create_practitioner(name, email_address)

    if not created:
        return failure_response("Failed to create email", 400)
    
    sql_db.session.add(practitioner)
    
    for specialization in  specializations:
        saved_specialization = Specialization.query.filter_by(name = specialization).first()
        if saved_specialization:
            print("specialization_found")
            practitioner.specializations.append(saved_specialization)
            
        else:
            success, specialization = crud.create_specialization(specialization)
            if not success:
                return failure_response("Failed to create specialization", 400)
            sql_db.session.add(specialization)
            # sql_db.session.commit()
            practitioner.specializations.append(specialization)
            
    for language in languages:
        saved_language = Language.query.filter_by(name = language).first()
        if saved_language:
            practitioner.languages.append(saved_language)
            
        else:
            success, language = crud.create_language(language)
            if not success:
                return failure_response("Failed to create language", 400)
            sql_db.session.add(language)
            # sql_db.session.commit()
            practitioner.languages.append(language)
    
    sql_db.session.commit()
    
    return success_response(practitioner.serialize(), 201)

@app.route("/practitioners/get/<int:id>/", methods = ["GET"])
@cross_origin(supports_credentials=True)
def get_practitioner(id):
    exists, practitioner = crud.get_practitioner_by_id(id)

    return success_response(practitioner.serialize(), 201)


@app.route("/forms/intake/", methods = ["POST"])
def create_intake_form():
    body = json.loads(request.data)
    practitioner_id = body.get("practitioner_id")
    data = body.get("data")

    if assert_none([practitioner_id, data]):
        return failure_response("Insufficient input", 400)
    
    exist, practitioner = crud.get_practitioner_by_id(practitioner_id)

    if not exist:
        return failure_response("Practitioner does not exists", 400)
    
    data["practitioner_id"] = practitioner_id
    
    created, form_id = crud.create_form(type = "intake", data = data)

    if not created:
        return failure_response("Could not create the form", 400)
    
    exists, form = crud.get_form_by_id(form_id)

    form = form["data"]

    if not exists:
        return failure_response("Form does not exists")


    intake_form_email_body = f"Dear Mrs. {practitioner.name},\n\n" + \
                             f"Attached is an intake form filled by {form['name']}\n\n" + \
                             "Sincerely,\n" + \
                             "Culture Care."
    
    intake_form_email_subject = "Intake Form PDF"
    x =  f"I hope you are well. My name is {form['name']}. I am {form['age_group']} in {form['location']}. " + \
         f"I found you on {form['directory_discovered']}. I am reaching " + \
         f"out because I am interested in receiving therapy for {form['area_of_concern']}." + \
         f"This is my {form['total_therapies']} receiving therapy. My email is {form['email']}." 

    x = split_string(x, 100)


    intake_form = [f"Hello Mrs. {practitioner.name}", 
    "",] + x + [f"Is there any way I can begin the process with you?",
    "",
    "Sincerely,",
    f"{form['name']}."
    ]

    media = [{"body":create_pdf(intake_form, "intakeform.pdf"), "type" : "pdf", "filename" : "intakeform"}]
    sent, message = email_automater.send_email(intake_form_email_body, 
                                               intake_form_email_subject, 
                                               "me", 
                                               practitioner.email_address, 
                                               media)
    
    if not sent:
        return failure_response("Could not send intake form")
    
    return success_response({"form_id" : form_id}, 201)

@app.route("/practitioners/get/", methods = ["GET"])
@cross_origin(supports_credentials=True)
def get_practitioners():
    practitioners = crud.get_practitioners()

    return success_response({"practitioners": practitioners})


@app.route('/practitioners/get/filter', methods=['POST'])
def get_filtered_practitioners():
    try:
        # Get the request data
        req_data = request.get_json()

        # Extract filters from the request data
        language_filter = req_data.get('language')
        specialization_filter = req_data.get('specialization')
        location_filter = req_data.get('location')
        gender_filter = req_data.get('gender')

        # Build the query for filtering practitioners
        query = Practitioner.query

        if language_filter:
            query = query.filter(Practitioner.languages.any(Language.name == language_filter))

        if specialization_filter:
            query = query.filter(Practitioner.specializations.any(Specialization.name == specialization_filter))

        if location_filter:
            query = query.filter(Practitioner.locations.any(Location.name == location_filter))

        if gender_filter:
            query = query.filter(Practitioner.genders.any(Gender.name == gender_filter))

        # Execute the query and get the filtered practitioners
        filtered_practitioners = query.all()

        # Serialize the practitioners
        serialized_practitioners = [practitioner.serialize() for practitioner in filtered_practitioners]

        return jsonify({"practitioners": serialized_practitioners}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Sample request body
sample_request_body = {
    "language": "English",
    "specialization": "Cardiology",
    "location": "City Hospital",
    "gender": "Male"
}

if __name__ == "__main__":
    app.run(debug=True, port="8000")
