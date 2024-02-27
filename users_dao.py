"""
DAO (Data Access Object) file

Helper file containing functions for accessing data in our database
"""

from sql_db import Practitioner, sql_db


def get_practitioner_by_email(email_address):
    """
    Returns a practitioner object from the database given an email
    """
    return Practitioner.query.filter(Practitioner.email_address == email_address).first()


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


def verify_credentials(email_address, password):
    """
    Returns true if the credentials match, otherwise returns false
    """
    possible_practitioner = get_practitioner_by_email(email_address)
    if possible_practitioner is None:
        return False, None
    return possible_practitioner.verify_password(password), possible_practitioner


def create_practitioner(name, email_address, password):
    """
    Creates a practitioner object in the database

    Returns if creation was successful, and the User object
    """
    possible_practitioner = get_practitioner_by_email(email_address)
    if possible_practitioner is not None:
        return False, possible_practitioner
    
    practitioner = Practitioner(name=name, email_address=email_address, password=password)
    sql_db.session.add(practitioner)
    sql_db.session.commit()
    return True, practitioner
  

def renew_session(update_token):
    """
    Renews a practitioner's session token
    
    Returns the practitioner object
    """
    possible_practitioner = get_practitioner_by_update_token(update_token)
    if possible_practitioner is None:
        raise Exception("Invalid refresh token")
    possible_practitioner.renew_session()
    sql_db.session.commit()
    return possible_practitioner