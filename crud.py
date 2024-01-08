"""
A module to access data from database
"""
from sql_db import Patient, Practitioner, EmailContent

from mongo_db import insert_into_forms_collection, find_form_by_id

def create_form(type, data):
    """
    Creates and returns a form record
    """
    created, form_id = insert_into_forms_collection(data = data, type = type)

    if not created:
        return False, None
    
    return True, form_id

def get_form_by_id(id):
    """
    Returns a form by id
    """
    exists, form = find_form_by_id(id)

    if not exists:
        return False, None
    
    return True, form


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
    practitioner = Practitioner.query.filter(Practitioner.id == practitioner_id).first()

    if not practitioner:
        return False, None
    
    return True, practitioner

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


def create_practitioner(name, email_address):
    """
    Creates and returns a practitioner
    """
    practitioner = Practitioner(name = name, email_address = email_address)

    if not practitioner:
        return False, None
    
    return True, practitioner


def create_patient(name, email_address):
    """
    Creates and returns a patient
    """
    patient = Patient(name = name, email_address = email_address)

    if not patient:
        return False, None
    
    return True, patient