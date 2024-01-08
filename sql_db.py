"""
The database of culture care api
"""

from flask_sqlalchemy import SQLAlchemy
sql_db = SQLAlchemy()

class EmailContent(sql_db.Model):
    """
    EmailContent Model
    """
    __tablename__ = "emailcontents"

    id = sql_db.Column(sql_db.Integer, primary_key=True, autoincrement = True)
    message = sql_db.Column(sql_db.String)
    practitioner_id = sql_db.Column(sql_db.Integer, sql_db.ForeignKey("practitioners.id"), nullable = False)
    subject = sql_db.Column(sql_db.String)



    def __init__(self, **kwargs):
        """
        Initializes a EmailContent object
        """
        self.message = kwargs.get("message")
        self.subject = kwargs.get("subject")
        self.practitioner_id = kwargs.get("practitioner_id")

    def simple_serialize(self):
        """
        Simple serializes an emailcontent object
        """
        return {
            "id" : self.id,
            "message" : self.message,
            "subject" : self.subject,
            "practitioner_id" : self.practitioner_id
        }
    
    def serialize(self):
        """
        Serializes an emailcontent object
        """
        return {
            "id" : self.id,
            "message" : self.message,
            "subject" : self.subject,
            "practitioner_id" : self.practitioner_id
        }


class Patient(sql_db.Model):
    """
    Patient Model
    """
    __tablename__ = "patients"
    id = sql_db.Column(sql_db.Integer, primary_key = True, autoincrement = True, nullable = False)

    name = sql_db.Column(sql_db.String, nullable = False)
    email_address = sql_db.Column(sql_db.String, nullable = False, unique = True)


    def __init__(self, **kwargs):
        """
        Initializes a Patient object
        """
        self.name = kwargs.get("name")
        self.email_address = kwargs.get("email_address")

    def simple_serialize(self):
        """
        Simple serializes a patient object
        """
        return {
            "id" : self.id,
            "name" : self.name,
            "email_address" : self.email_address,
        }
    
    def serialize(self):
        """
        Serializes a patient 
        """
        return {
            "id" : self.id,
            "name" : self.name,
            "email_address" : self.email_address
        }


class Practitioner(sql_db.Model):
    """
    Practitioner Model
    """
    __tablename__ = "practitioners"
    id = sql_db.Column(sql_db.Integer, primary_key = True, autoincrement = True)

    name = sql_db.Column(sql_db.String, nullable = False)
    email_address = sql_db.Column(sql_db.String, nullable = False, unique = True)
    emailcontents = sql_db.relationship("EmailContent")  

    def __init__(self, **kwargs):
        """
        Initializes a Practitioner object
        """
        self.name = kwargs.get("name")
        self.email_address = kwargs.get("email_address")

    def simple_serialize(self):
        """
        Simple serializes a practitioner object
        """
        return {
            "id" : self.id,
            "name" : self.name,
            "email_address" : self.email_address,
        }
    
    def serialize(self):
        """
        Serializes a patient 
        """
        return {
            "id" : self.id,
            "name" : self.name,
            "email_address" : self.email_address
        }


