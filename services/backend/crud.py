"""
A module to access data from database
"""
from sql_db import Patient, Practitioner, Gender, Specialization, Language, Location, PaymentMethod

# from mongo_db import insert_into_forms_collection, find_form_by_id

# def create_form(type, data):
#     """
#     Creates and returns a form record
#     """
#     print("runnng insertion")
#     created, form_id = insert_into_forms_collection(data = data, type = type)

#     if not created:
#         return False, None
    
#     return True, form_id

# def get_form_by_id(id):
#     """
#     Returns a form by id
#     """
#     exists, form = find_form_by_id(id)

#     if not exists:
#         return False, None
    
#     return True, form



def get_practitioner_by_email(email_address):
    """
    Returns a practitioner object from the database given an email
    """
    return Practitioner.query.filter(Practitioner.email_address == email_address).first()

def get_patient_by_id(patient_id):
    """
    Returns patient with patient_id
    """

    patient = Patient.query.filter(Patient.id == patient_id).first()

    if not patient:
        return False, None
    return True, patient

def get_practitioner_by_id(practitioner_id):
    """
    Returns practitioner with practitioner_id
    """
    practitioner = Practitioner.query.filter(Practitioner.id == practitioner_id, Practitioner.is_active == True).first()

    if not practitioner:
        return False, None
    
    return True, practitioner

def delete_practioner_by_id(id):
    """
    Sets is_active of practioner of this id to False and returns the practitioner
    """
    practitioner = Practitioner.query.filter(Practitioner.id == id).first()
    if not practitioner: return False, None
    practitioner.is_active = False
    practitioner.email_address = ""
    return True, practitioner

def get_practitioners():
    pracitioners = Practitioner.query.filter(Practitioner.is_active == True).all()
    pracitioners_json = []
    for practitioner in pracitioners:
        pracitioners_json.append(practitioner.serialize())

    return pracitioners_json

def get_emailcontent_by_id(emailcontent_id):
    """
    Returns emailcontent with emailcontent_id
    """
    email_content = EmailContent.query.filter(EmailContent.id == emailcontent_id).first()

    if not email_content:
        return False, None
    
    return True, email_content


def create_email_content(subject, message, practitioner_id):
    """
    Creates and returns an email content
    """
    email_content = EmailContent(subject = subject, message = message, practitioner_id = practitioner_id)

    if not email_content:
        return False, None
    
    return True, email_content


def create_practitioner(name, email_address, password, description, appointments):
    """
    Creates a practitioner object in the database

    Returns if creation was successful, and the User object
    """
    practitioner = get_practitioner_by_email(email_address)
    if practitioner is not None:
        return False, practitioner
    practitioner = Practitioner(name=name, email_address=email_address, password=password, description = description, appointments = appointments)
    return True, practitioner

from sqlalchemy.orm.attributes import flag_modified

def update_appointment_status(sql_db, practitioner_id, patient_name, new_status):
    """
    Updates the status of a specific appointment for a practitioner.

    :param email_address: Email address of the practitioner.
    :param appointment_id: The ID of the appointment to update.
    :param new_status: The new status to apply to the appointment.
    :return: Boolean indicating if the update was successful.

    ::TEMPORARY, WILL DEPRECIATE AFTER 20 MAR
    """
    practitioner = Practitioner.query.filter(Practitioner.id == practitioner_id).first()
    if practitioner is None:
        return False


    practitioner.update_appointment(patient_name, new_status)

    try:
        sql_db.session.commit()
        return True
    except Exception as e:
        print(f"Error adding new status: {e}")
        sql_db.session.rollback()
        return False

def add_appointment_to_practitioner(sql_db, practitioner_id, new_appointment):
    """
    Adds a new appointment to the appointments for a given practitioner.
    
    :param email_address: Email address of the practitioner to update.
    :param new_appointment: New appointment to be added, expected to be a dict.
    :return: Boolean indicating if the update was successful.
    """
    practitioner = Practitioner.query.filter(Practitioner.id == practitioner_id).first()
    if practitioner is None:
        return False  

    practitioner.add_appointment(new_appointment)

    try:
        sql_db.session.commit()
        return True
    except Exception as e:
        print(f"Error adding new appointment: {e}")
        sql_db.session.rollback()
        return False

def get_practitioner_by_session_token(session_token):
    """
    Returns a practitioner object from the database given a session token
    """
    return Practitioner.query.filter(Practitioner.session_token == session_token).first()


def get_practitioner_by_update_token(update_token):
    """
    Returns a practitioner object from the database given an update token
    """
    return Practitioner.query.filter(Practitioner.update_token == update_token).first()


def create_patient(name, email_address):
    """
    Creates and returns a patient
    """
    patient = None
    try:
        patient = Patient(name = name, email_address = email_address)
    except:
        return False, None

    if not patient:
        return False, None
    
    return True, patient

def create_specialization(name):
    """
    Creates and returns a specialization
    """
    specialization = Specialization(name = name)

    if not specialization:
        return False, None
    
    return True, specialization


def create_language(name):
    """
    Creates and returns a language
    """
    language = Language(name = name)

    if not language:
        return False, None
    
    return True, language


def get_specialization_by_id(id):
    """
    Gets a specialization
    """
    specialization = Specialization.query.filter(Specialization.id == id).first()

    if not specialization:
        return False, None
    
    return True, specialization

def get_specialization_by_name(name):
    """
    Gets a specialization
    """
    specialization = Specialization.query.filter(Specialization.name == name).first()

    if not specialization:
        return False, None
    
    return True, specialization

def get_language_by_id(id):
    """
    Gets a language
    """
    language = Language.query.filter(Language.id == id).first()

    if not language:
        return False, None
    
    return True, language

def get_language_by_name(name):
    """
    Gets a language
    """
    language = Language.query.filter(Language.name == name).first()

    if not language:
        return False, None
    
    return True, language

def create_gender(name):
    """
    Creates and returns a gender
    """
    gender = Gender(name = name)

    if not gender:
        return False, None
    
    return True, gender


def get_gender_by_id(id):
    """
    Gets a specialization
    """
    gender = Gender.query.filter(Gender.id == id).first()

    if not gender:
        return False, None
    
    return True, gender

def get_gender_by_name(name):
    """
    Gets a specialization
    """
    gender = Gender.query.filter(Gender.name == name).first()

    if not gender:
        return False, None
    
    return True, gender


def create_location(name):
    """
    Creates and returns a location
    """
    location = Location(name = name)

    if not location:
        return False, None
    
    return True, location


def create_paymentmethod(name):
    """
    Creates and returns a network
    """
    paymentmethod = PaymentMethod(name = name)

    if not paymentmethod:
        return False, None
    
    return True, paymentmethod


def get_paymentmethod_by_name(name):
    """
    Gets a specialization
    """
    paymentmethod = PaymentMethod.query.filter(PaymentMethod.name == name).first()

    if not paymentmethod:
        return False, None
    
    return True, paymentmethod


def get_location_by_name(name):
    """
    Gets a location
    """
    location = Location.query.filter(Location.name == name).first()

    if not location:
        return False, None
    
    return True, location
