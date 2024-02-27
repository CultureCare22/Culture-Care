"""
Module for verification
"""

from crud import get_practitioner_by_email, get_practitioner_by_update_token


def verify_credentials(email_address, password):
    """
    Returns true if the credentials match, otherwise returns false
    """
    practitioner = get_practitioner_by_email(email_address)
    if practitioner is None:
        return False, None
    return practitioner.verify_password(password), practitioner
  

def renew_session(update_token):
    """
    Renews a practitioner's session token
    
    Returns the practitioner object
    """
    practitioner = get_practitioner_by_update_token(update_token)
    if practitioner is None:
        raise Exception("Invalid refresh token")
    practitioner.renew_session()
    return practitioner