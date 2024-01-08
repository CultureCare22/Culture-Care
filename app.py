from flask import Flask, request
from sql_db import sql_db
import email_automater
from email_media import create_pdf
import json
db_filename = "culturecaresql.db"
app = Flask(__name__)
import crud
import os
import dotenv
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
    
    sender = os.environ.getenv("GMAIL_SENDER")
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
        return failure_response("Failed to create email", 400)
    
    sql_db.session.add(patient)
    sql_db.session.commit()
    
    return success_response(patient.serialize(), 201)


@app.route("/practitioners/create/", methods = ["POST"])
def create_practitioner():
    """
    Endpoint to create practitioner
    """
    body = json.loads(request.data)
    name = body.get("name")
    email_address = body.get("email_address")

    if assert_none([name, email_address]):
        return failure_response("Insufficient inputs", 400)
    
    created, practitioner = crud.create_practitioner(name, email_address)

    if not created:
        return failure_response("Failed to create email", 400)
    
    sql_db.session.add(practitioner)
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

    intake_form = [f"Hello Mrs. {practitioner.name}", 
    "",
    f"I hope you are well. My name is {form['name']}. I am {form['age_group']} in",
    f"{form['location']}. I found you on {form['directory_discovered']}. I am reaching",
    f"out because I am interested in receiving therapy for {form['area_of_concern']}.",
    f"This is my {form['total_therapies']}'th time receiving therapy. My email is {form['email']}.",
    "",
    f"Is there any way I can begin the process with you?",
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


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
