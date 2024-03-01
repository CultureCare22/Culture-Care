"""
Author: Jephthah Mensah, Blay Ambrose, Jae
"""
from flask import Flask, request, jsonify
from sql_db import sql_db, Practitioner, Language, Gender, Specialization, PaymentMethod, Location
import verification
import datetime
from flask import Flask, request
from sql_db import sql_db
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
    # sql_db.drop_all()
    sql_db.create_all()


def session_commited(db):
    try:
        db.session.commit()
    except:
        return False
    return True

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

def extract_token(request):
    """
    Helper function that extracts the token from the header of a request
    """
    auth_token = request.headers.get("Authorization")
    if auth_token is None:
        return False, failure_response("Missing authorization")
    
    bearer_token = auth_token.replace("Bearer", "").strip()
    if not bearer_token:
        return False, failure_response("Invalid Authorization header")
    return True, bearer_token


@app.route("/login/", methods=["POST"])
def login():
    """
    Endpoint for logging in a user
    """
    body = json.loads(request.data)
    email_address = body.get("email_address")
    password = body.get("password")
    
    if email_address is None or password is None:
        return failure_response("Invalid body")
    
    success, practitioner = verification.verify_credentials(email_address, password)
    if not success:
        return failure_response("invalid credentials")
    
    practitioner.renew_session()
    sql_db.session.commit()
    
    return success_response({"session_token": practitioner.session_token,
                       "update_token": practitioner.update_token})

@app.route("/session/", methods=["POST"])
def update_session():
    """
    Endpoint for updating a user's session
    """
    success, response = extract_token(request)
    if not success:
        return response
    update_token = response
    try:
        practitioner = crud.get_practitioner_by_update_token(update_token)
        if practitioner is None:
            return failure_response("Invalid update token")
        if not practitioner.verify_token(practitioner.update_token, practitioner.update_token_expiration, update_token):
            return failure_response("Expired update token")
        practitioner = verification.renew_session(update_token)
        sql_db.session.commit()
    except Exception as e:
        return failure_response("Invalid update token")
    
    return json.dumps({
                       "session_token": practitioner.session_token,
                       "update_token": practitioner.update_token
    })


@app.route("/secret/", methods=["GET"])
def secret_message():
    """
    Endpoint for verifying a session token and returning a secret message

    In your project, you will use the same logic for any endpoint that needs 
    authentication
    """
    success, response = extract_token(request)
    if not success:
        return response
    session_token = response
    practitioner = crud.get_practitioner_by_session_token(session_token)
    if not practitioner or not practitioner.verify_token(practitioner.session_token, practitioner.session_expiration, session_token):
        return failure_response("Invalid session token")
    return success_response({"success":"Hello " + practitioner.name})

@app.route("/logout/", methods=["POST"])
def logout():
    """
    Endpoint for logging out a user
    """
    success, response = extract_token(request)
    if not success:
        return response
    session_token = response
    practitioner = crud.get_practitioner_by_session_token(session_token)
    if not practitioner or not practitioner.verify_token(practitioner.session_token, practitioner.session_expiration,session_token):
        return failure_response("Invalid session token")
    practitioner.session_expiration = datetime.datetime.now()
    practitioner.update_token_expiration = datetime.datetime.now()
    sql_db.session.commit()
    return success_response({"success": "You have been logged out"})


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

@app.route("/practitioners/<int:id>/specializations/add/", methods = ["POST"])
def add_specializations(id):
    body = json.loads(request.data)
    specializations = body.get("specializations")
    exists, practitioner = crud.get_practitioner_by_id(id)
    if not exists:
        return failure_response("Practitioner does not exists")
    for name in specializations:
        exists, specialization = crud.get_specialization_by_name(name)
        created = False
        if not exists:
            created, specialization = crud.create_specialization(name)
            if created:
                sql_db.session.add(specialization)
                practitioner.specializations.append(specialization)
        elif specialization not in set(practitioner.specializations):
            practitioner.specializations.append(specialization)

    if session_commited(sql_db): return success_response({"practitioner" : practitioner.serialize()}, 201) 
    else: return failure_response("Cannot commit")

@app.route("/practitioners/<int:id>/languages/add/", methods = ["POST"])
def add_languages(id):
    body = json.loads(request.data)
    languages = body.get("languages")
    exists, practitioner = crud.get_practitioner_by_id(id)
    if not exists:
        return failure_response("Practitioner does not exists")
    for name in languages:
        exists, language = crud.get_language_by_name(name)
        created = False
        if not exists:
            created, language = crud.create_language(name)
            if created:
                sql_db.session.add(language)
                practitioner.languages.append(language)
        elif language not in set(practitioner.languages):
            practitioner.languages.append(language)
    sql_db.session.commit()
    return success_response({"practitioner" : practitioner.serialize()}, 201)

@app.route("/practitioners/<int:id>/locations/add/", methods = ["POST"])
def add_locations(id):
    body = json.loads(request.data)
    locations = body.get("locations")
    exists, practitioner = crud.get_practitioner_by_id(id)
    if not exists:
        return failure_response("Practitioner does not exists")
    for name in locations:
        exists, location = crud.get_location_by_name(name)
        created = False
        if not exists:
            created, location = crud.create_location(name)
            if created:
                sql_db.session.add(location)
                practitioner.locations.append(location)
        elif location not in set(practitioner.locations):
            practitioner.locations.append(location)
    sql_db.session.commit()
    return success_response({"practitioner" : practitioner.serialize()}, 201)
    
@app.route("/practitioners/<int:id>/paymentmethods/add/", methods = ["POST"])
def add_paymentmethods(id):
    body = json.loads(request.data)
    paymentmethods = body.get("paymentmethods")
    exists, practitioner = crud.get_practitioner_by_id(id)
    if not exists:
        return failure_response("Practitioner does not exists")
    for name in paymentmethods:
        exists, paymentmethod = crud.get_paymentmethod_by_name(name)
        created = False
        if not exists:
            created, paymentmethod = crud.create_paymentmethod(name)
            if created:
                sql_db.session.add(paymentmethod)
                practitioner.paymentmethods.append(paymentmethod)
        elif paymentmethod not in set(practitioner.paymentmethods):
            practitioner.paymentmethods.append(paymentmethod)
    sql_db.session.commit()
    return success_response({"practitioner" : practitioner.serialize()}, 201)

@app.route("/practitioners/<int:id>/genders/add/", methods = ["POST"])
def add_genders(id):
    """
    TODO: add documentations
    """
    body = json.loads(request.data)
    genders = body.get("genders")
    exists, practitioner = crud.get_practitioner_by_id(id)
    if not exists:
        return failure_response("Practitioner does not exists")
    for name in genders:
        exists, gender = crud.get_gender_by_name(name)
        created = False
        if not exists:
            created, gender = crud.create_gender(name)
            if created:
                sql_db.session.add(gender)
                practitioner.genders.append(gender)
        elif gender not in set(practitioner.genders):
            practitioner.genders.append(gender)
    sql_db.session.commit()
    return success_response({"practitioner" : practitioner.serialize()}, 201)

@app.route("/practitioners/create/", methods = ["POST"])
def create_practitioner():
    """
    Endpoint to create practitioner
    """
    body = json.loads(request.data)
    name = body.get("name")
    email_address = body.get("email_address")
    password = body.get("password")

    if assert_none([name, email_address, password]):
        return failure_response("Insufficient inputs", 400)
    
    created, practitioner = crud.create_practitioner(name, email_address, password)

    if not created:
        return failure_response("Failed to create practitioner", 400)
    
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


def strict_filter(**kwargs):
    filtered_practitioners = set()
    languages = kwargs.get("languages", [])
    specializations = kwargs.get("specializations", [])
    genders= kwargs.get("genders", [])
    locations = kwargs.get("locations", [])
    practitioners_l = set()
    # set and intersection
    dict = {}
    idx = None
    for i in range(len(languages)):
        idx = i
        dict[i] = set()
            
        language = languages[i]
        language = Language.query.filter(Language.name == language).first()
        if language:
            practitioners_l = language.practitioners
        else:
            break
        for practitioner in practitioners_l:
            if i == 0:
                dict[i].add(practitioner)

            elif practitioner in dict[i-1]:
                dict[i].add(practitioner)

    if idx is not None:
        filtered_practitioners = dict[idx]


    for i in range(len(specializations)):
        idx = i
        dict[i] = set()
            
        specialization = specializations[i]
        specialization = Specialization.query.filter(Specialization.name == specialization).first()
        if specialization:
            practitioners_l = specialization.practitioners
        else:
            break
        for practitioner in practitioners_l:
            if i == 0:
                if filtered_practitioners:
                    if practitioner in filtered_practitioners:
                        dict[i].add(practitioner)
                else:
                    dict[i].add(practitioner)
            elif practitioner in dict[i-1]:
                dict[i].add(practitioner)
                
    if idx is not None:
        filtered_practitioners = dict[idx]


    for i in range(len(genders)):
        idx = i
        dict[i] = set()
            
        gender = genders[i]
        gender = Gender.query.filter(Gender.name == gender).first()
        if gender:
            practitioners_l = gender.practitioners
        else:
            break
        for practitioner in practitioners_l:
            if i == 0:
                if filtered_practitioners:
                    if practitioner in filtered_practitioners:
                        dict[i].add(practitioner)
                else:
                    dict[i].add(practitioner)
            elif practitioner in dict[i-1]:
                dict[i].add(practitioner)
                
    if idx is not None:
        filtered_practitioners = dict[idx]


    for i in range(len(locations)):
        idx = i
        dict[i] = set()
            
        location = locations[i]
        location = Location.query.filter(Location.name == location).first()
        if location:
            practitioners_l = location.practitioners
        else:
            break
        for practitioner in practitioners_l:
            if i == 0:
                if filtered_practitioners:
                    if practitioner in filtered_practitioners:
                        dict[i].add(practitioner)
                else:
                    dict[i].add(practitioner)
            elif practitioner in dict[i-1]:
                dict[i].add(practitioner)
 
    if idx is not None:
        filtered_practitioners = dict[idx]

    return success_response({"practitioners": [practitioner.serialize() for practitioner in filtered_practitioners]})
                        

def flexible_filter(languages, specializations, genders, locations):
    #TODO: need to look at the logic
    filtered_practitioners_arrays = []
    if languages:
        
        for language in languages:
            
            practitioners = Language.query.filter_by(name = language).first()
            if practitioners:
                filtered_practitioners_by_language = []
                for practitioner in practitioners.practitioners:
                    if practitioner not in set(filtered_practitioners_by_language):
                        filtered_practitioners_by_language.append(practitioner)
                filtered_practitioners_arrays.append(filtered_practitioners_by_language)
    
                       
    if specializations:
        
        for specialization in specializations:
            practitioners = Specialization.query.filter_by(name = specialization).first()
            if practitioners:
                filtered_practitioners_by_specialization = [] 
                for practitioner in practitioners.practitioners:
                    if practitioner not in set(filtered_practitioners_by_specialization):
                        filtered_practitioners_by_specialization.append(practitioner)
                filtered_practitioners_arrays.append(filtered_practitioners_by_specialization)
                        
    
    if genders:
        
        for gender in genders:
            practitioners = Gender.query.filter_by(name = gender).first()
            if practitioners:
                filtered_practitioners_by_gender = []
                for practitioner in practitioners.practitioners:
                    if practitioner not in set(filtered_practitioners_by_gender):
                        filtered_practitioners_by_gender.append(practitioner)
                filtered_practitioners_arrays.append(filtered_practitioners_by_gender)
                     
    
    # if locations:
        
    #     for location in locations:
    #         practitioners = Location.query.filter_by(name = location).first()
    #         if practitioners:
    #             filtered_practitioners_by_location = []
    #             for practitioner in practitioners.practitioners:
    #                 if practitioner not in filtered_practitioners_by_location:
    #                     filtered_practitioners_by_location.append(practitioner)
    #             filtered_practitioners_arrays.append(filtered_practitioners_by_location)
    
    if filtered_practitioners_arrays == []:
        return failure_response("No practitioners match the filters")

    filtered_practitioners = []
    for list in filtered_practitioners_arrays:
        for practitioner in list:
            if practitioner not in set(filtered_practitioners):
                filtered_practitioners.append(practitioner)
    return success_response([practitioner.serialize() for practitioner in filtered_practitioners])
    

@app.route('/practitioners/get/filter/', methods=['POST'])
def get_filtered_practitioners():
    """
    Endpoint for filtering practitioners
    """
    body = json.loads(request.data)
    languages = body.get("languages", [])
    specializations = body.get("specializations", [])
    genders = body.get("genders", [])
    locations = body.get("locations", [])

    return strict_filter(languages=languages, specializations=specializations, genders=genders, locations=locations)


def check_soft_pass(specializations, practitioner):
    #TODO: need to look at the logic
    specialization_matches = []
    if specializations: 
        practitioner_specializations = [specialization.name for specialization in practitioner.specializations]
        for specialization in practitioner_specializations:
            if specialization in set(specializations):
                specialization_matches.append(specialization)
        if len(specialization_matches) == 0:
            return False, practitioner
    return True, practitioner


def check_hard_pass(locations, paymentmethods, practitioner):
    #TODO: need to look at the logic
    location_matches = []
    paymentmethod_matches = []

    practitioner_locations = [location.name for location in practitioner.locations]
    for location in practitioner_locations:
        if location in set(locations):
            location_matches.append(location)
    if len(location_matches) == 0:
        return False, "sorry you did not match with the therapist because of the location . Here are a list of resources you can use"
    
    practitioner_paymentmethods = [paymentmethod.name for paymentmethod in practitioner.paymentmethods]
    for paymentmethod in practitioner_paymentmethods:
        if paymentmethod in set(paymentmethods):
            paymentmethod_matches.append(paymentmethod)
    if len(paymentmethod_matches) == 0:
        return False, "sorry you did not match with the therapist because of the payment method . Here are a list of resources you can use. "
        
    return True, practitioner

@app.route('/practitioners/get/<int:practitioner_id>/match/', methods=['POST'])             
def match_practitioners(practitioner_id):
    """
    Endpoint for matching practitioners
    """
    body = json.loads(request.data)
    locations = body.get("locations")
    paymentmethods = body.get("paymentmethods")
    specializations = body.get("specializations")

    success, practitioner = crud.get_practitioner_by_id(practitioner_id)
    if not success:
        return failure_response("Practitioner does not exists")
    
    
    success, practitioner = check_hard_pass(locations, paymentmethods, practitioner)
    
    if not success:
        return failure_response({"matched": False, "message" : practitioner})
    
    soft_pass_success, practitioner = check_soft_pass(specializations, practitioner) 
    
    if soft_pass_success:
        return success_response({"matched": True, "message" : "Everything matches"})
    
    if not soft_pass_success:
        return success_response({"matched": False, "message" : "Specialization does not match but we will send your information to the therapist and we will let you know when she approves/declines your appointment request"})



#TODO: 
    # 1. We have: verify_password, verify_session_token, verify_update_token, renew_session
    # 2. To write: get session token and update token from the (Authorization header)
    # 3. Endpoints: Endpoint to renew_token , endpoint login, endpoint logout, add pass to create_practitioner endpoint

if __name__ == "__main__":
    app.run(debug=True, port="8000")
