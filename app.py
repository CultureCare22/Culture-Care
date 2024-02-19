"""
Author: Jephthah Mensah, Blay Ambrose, Jae
"""
from flask import Flask, request, jsonify
from sql_db import sql_db, Practitioner, Language, Gender, Specialization, PaymentMethod, Location

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

    if assert_none([name, email_address]):
        return failure_response("Insufficient inputs", 400)
    
    created, practitioner = crud.create_practitioner(name, email_address)

    if not created:
        return failure_response("Failed to create email", 400)
    sql_db.session.add(practitioner)
    
    if session_commited(sql_db): 
        return success_response(practitioner.serialize(), 201) 
    else: 
        return failure_response("Cannot commit session")

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
    #TODO: need to look at the logic
    all_practitioners = Practitioner.query.filter().all()
    filtered_practitioners = all_practitioners[:]
    languages = kwargs.get("languages")
    specializations = kwargs.get("specializations")
    genders= kwargs.get("genders")
    locations = kwargs.get("locations")
    
    if languages:
        for language in languages:
            for practitioner in all_practitioners:
                practitioner_languages = [language.name for language in practitioner.languages]
                if language not in practitioner_languages:
                    try:
                        filtered_practitioners.remove(practitioner)
                    except:
                        pass
    
    if specializations:
        for specialization in specializations:
            for practitioner in all_practitioners:
                practitioner_specializations = [specialization.name for specialization in practitioner.specializations]
                if specialization not in practitioner_specializations:
                    try:
                        filtered_practitioners.remove(practitioner)
                    except:
                        pass
                    
    if genders:
        for gender in genders:
            for practitioner in all_practitioners:
                practitioner_genders = [gender.name for gender in practitioner.genders]
                if gender not in practitioner_genders:
                    try:
                        filtered_practitioners.remove(practitioner)
                    except:
                        pass
                    
    if locations:
        for location in locations:
            for practitioner in all_practitioners:
                practitioner_locations = [location.name for location in practitioner.locations]
                if location not in practitioner_locations:
                    try:
                        filtered_practitioners.remove(practitioner)
                    except:
                        pass
 
    
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
                    if practitioner not in filtered_practitioners_by_language:
                        filtered_practitioners_by_language.append(practitioner)
                filtered_practitioners_arrays.append(filtered_practitioners_by_language)
    
                       
    if specializations:
        
        for specialization in specializations:
            practitioners = Specialization.query.filter_by(name = specialization).first()
            if practitioners:
                filtered_practitioners_by_specialization = [] 
                for practitioner in practitioners.practitioners:
                    if practitioner not in filtered_practitioners_by_specialization:
                        filtered_practitioners_by_specialization.append(practitioner)
                filtered_practitioners_arrays.append(filtered_practitioners_by_specialization)
                        
    
    if genders:
        
        for gender in genders:
            practitioners = Gender.query.filter_by(name = gender).first()
            if practitioners:
                filtered_practitioners_by_gender = []
                for practitioner in practitioners.practitioners:
                    if practitioner not in filtered_practitioners_by_gender:
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
            if practitioner not in filtered_practitioners:
                filtered_practitioners.append(practitioner)
    return success_response([practitioner.serialize() for practitioner in filtered_practitioners])
    

@app.route('/practitioners/get/filter/', methods=['POST'])
def get_filtered_practitioners():
    """
    Endpoint for filtering practitioners
    """
    body = json.loads(request.data)
    languages = body.get("languages")
    specializations = body.get("specializations")
    genders = body.get("genders")
    locations = body.get("locations")
    
    return strict_filter(languages=languages, specializations=specializations, gendrs=genders, locations=locations)


def check_soft_pass(specializations, practitioner):
    #TODO: need to look at the logic
    specialization_matches = []
    if specializations: 
        practitioner_specializations = [specialization.name for specialization in practitioner.specializations]
        for specialization in practitioner_specializations:
            if specialization in specializations:
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
        if location in locations:
            location_matches.append(location)
    if len(location_matches) == 0:
        return False, "No location matches"
    
    practitioner_paymentmethods = [paymentmethod.name for paymentmethod in practitioner.paymentmethods]
    for paymentmethod in practitioner_paymentmethods:
        if paymentmethod in paymentmethods:
            paymentmethod_matches.append(paymentmethod)
    if len(paymentmethod_matches) == 0:
        return False, "paymentmethod method not a match"
        
    return True, practitioner

@app.route('/practitioners/get/<int:practitioner_id>/match/', methods=['POST'])             
def match_practitioners(practitioner_id):
    #TODO: need to look at the logic
    """
    Endpoint for matching practitioners
    """
    body = json.loads(request.data)
    locations = body.get("locations")
    paymentmethods = body.get("paymentmethods")
    specializations = body.get("specializations")

    if not locations or not paymentmethods: return failure_response("Invalid inputs")

    success, practitioner = crud.get_practitioner_by_id(practitioner_id)
    if not success:
        return failure_response("Practitioner does not exists")
    
    success, practitioner = check_hard_pass(locations, paymentmethods, practitioner)
    
    if not success:
        return failure_response("Practitioner does not match")
                
    # if not success :
    #     matched_practitioners = []
    #     practitioners = Practitioner.query.filter().all()
        
    #     for practitioner in practitioners:
    #         success, practitioner = check_hard_pass(locations, paymentmethods, practitioner)
    #         if success:
    #             matched_practitioners.append(practitioner)
    #     if len(matched_practitioners) != 0:
    #         return success_response([[{"message":"Practitioner not found. Here are other options"}],[practitioner.serialize() for practitioner in matched_practitioners]])
    #     return failure_response("Practitioner not a match")
    
    soft_pass_success, practitioner = check_soft_pass(specializations, practitioner) 
    
    if soft_pass_success:
        return success_response({"matched": True})
    
    if not soft_pass_success:
        return success_response({"matched": False})

if __name__ == "__main__":
    app.run(debug=True, port="8000")
