"""
The database of culture care api
"""

from flask_sqlalchemy import SQLAlchemy
import bcrypt

sql_db = SQLAlchemy()

practitioner_gender_table = sql_db.Table('practitioner_gender',
    sql_db.Column('practitioner_id', sql_db.Integer, sql_db.ForeignKey('practitioners.id'), primary_key=True),
    sql_db.Column('gender_id', sql_db.Integer, sql_db.ForeignKey('genders.id'), primary_key=True)
)

practitioner_location_table = sql_db.Table('practitioner_location',
    sql_db.Column('practitioner_id', sql_db.Integer, sql_db.ForeignKey('practitioners.id'), primary_key=True),
    sql_db.Column('location_id', sql_db.Integer, sql_db.ForeignKey('locations.id'), primary_key=True)
)

practitioner_specialization_table = sql_db.Table('practitioner_specialization',
    sql_db.Column('practitioner_id', sql_db.Integer, sql_db.ForeignKey('practitioners.id'), primary_key=True),
    sql_db.Column('specialization_id', sql_db.Integer, sql_db.ForeignKey('specializations.id'), primary_key=True)
)

practitioner_language_table = sql_db.Table('practitioner_language',
    sql_db.Column('practitioner_id', sql_db.Integer, sql_db.ForeignKey('practitioners.id'), primary_key=True),
    sql_db.Column('language_id', sql_db.Integer, sql_db.ForeignKey('languages.id'), primary_key=True)
)

practitioner_network_table = sql_db.Table('practitioner_paymentmethod',
    sql_db.Column('practitioner_id', sql_db.Integer, sql_db.ForeignKey('practitioners.id'), primary_key=True),
    sql_db.Column('paymentmethod_id', sql_db.Integer, sql_db.ForeignKey('paymentmethods.id'), primary_key=True)
)

practice_insurance_table = sql_db.Table('practice_insurance',
    sql_db.Column('practice_id', sql_db.Integer, sql_db.ForeignKey('practices.id'), primary_key=True),
    sql_db.Column('insurance_id', sql_db.Integer, sql_db.ForeignKey('insurances.id'), primary_key=True)
)

patient_gender_table = sql_db.Table('patient_gender',
    sql_db.Column('patient_gender_id', sql_db.Integer, sql_db.ForeignKey('consutaltions.id'), primary_key=True),
    sql_db.Column('gender_id', sql_db.Integer, sql_db.ForeignKey('genders.id'), primary_key=True)
)
    

class Practitioner(sql_db.Model):
    """
    Practitioner Model
    """
    __tablename__ = "practitioners"
    id = sql_db.Column(sql_db.Integer, primary_key = True, autoincrement = True)

    name = sql_db.Column(sql_db.String, nullable = False)
    email_address = sql_db.Column(sql_db.String, nullable = False, unique = True)
    is_deleted = sql_db.Column(sql_db.Boolean, default = False, nullable = False)

    description = sql_db.Column(sql_db.String, nullable = True)

    appointments = sql_db.Column(sql_db.JSON, nullable = True)
    
    practice_id = sql_db.Column(sql_db.Integer, sql_db.ForeignKey("practices.id"))

    genders = sql_db.relationship("Gender", secondary = practitioner_gender_table, back_populates = "practitioners")  
    languages = sql_db.relationship("Language", secondary = practitioner_language_table, back_populates = "practitioners")  
    locations = sql_db.relationship("Location", secondary = practitioner_location_table, back_populates = "practitioners")  
    specializations = sql_db.relationship("Specialization", secondary = practitioner_specialization_table, back_populates = "practitioners")
    paymentmethods = sql_db.relationship("PaymentMethod", secondary = practitioner_network_table, back_populates = "practitioners")  


    password_digest = sql_db.Column(sql_db.String, nullable= False, unique = True)

    session_token = sql_db.Column(sql_db.String, nullable=False, unique=True)
    session_expiration = sql_db.Column(sql_db.DateTime, nullable=False)
    update_token = sql_db.Column(sql_db.String, nullable=False, unique=True)
    update_token_expiration = sql_db.Column(sql_db.DateTime, nullable=False)


    consultations = sql_db.relationship("Consultation", back_populates="practitioners", uselist = False)
    metrics = sql_db.relationship("Consultation", back_populates="practitioners", uselist = False)

    #TODO: establish practice-practitioner relationship

    def __init__(self, **kwargs):
        """
        Initializes a Practitioner object
        """
        self.name = kwargs.get("name")
        self.email_address = kwargs.get("email_address")
        self.password_digest = bcrypt.hashpw(kwargs.get("password").encode("utf8"), bcrypt.gensalt(rounds=13))
        self.description = kwargs.get("description")
        self.appointments = kwargs.get("appointments")
        self.renew_session()

    def simple_serialize(self):
        """
        Simple serializes a practitioner object
        """
        return {
            "id" : self.id,
            "name" : self.name,
            "email_address" : self.email_address,
            "password" : self.session_token
        }

    def serialize(self):
        """
        Serializes a practitioner
        """
        
        practice = Practice.query.filter_by(id = self.practice_id).first()

        return {
            "id" : self.id,
            "name" : self.name,
            "is_deleted" : self.is_deleted,
            "email_address" : self.email_address, 
            "practice": practice.name,
            "description" : self.description,
            "genders" : [gender.simple_serialize() for gender in self.genders],
            "languages" : [language.simple_serialize() for language in self.languages],
            "locations" : [location.simple_serialize() for location in self.locations],
            "specializations" : [specialization.simple_serialize() for specialization in self.specializations],
            "paymentmethods" : [payment_method.simple_serialize() for payment_method in self.paymentmethods],
            "appointments" :  [consultation.simple_serialize() for consultation in self.consultations],
        }


class Gender(sql_db.Model):
    """
    Gender Model
    """
    __tablename__ = "genders"
    id = sql_db.Column(sql_db.Integer, primary_key = True, autoincrement = True)
    name = sql_db.Column(sql_db.String, nullable = False)
    practitioners = sql_db.relationship("Practitioner", secondary = practitioner_gender_table, back_populates = "genders") 

    patients = sql_db.relationship("Consultation", secondary = patient_gender_table, back_populates = "genders")  



    def __init__(self, **kwargs):
        """
        Initializes a Gender object
        """
        self.name = kwargs.get("name")

    def simple_serialize(self):
        return {"id" : self.id, "name" : self.name}
    
        
class Language(sql_db.Model):
    """
    Language Model
    """
    __tablename__ = "languages"
    id = sql_db.Column(sql_db.Integer, primary_key = True, autoincrement = True)
    name = sql_db.Column(sql_db.String, nullable = False)
    practitioners = sql_db.relationship("Practitioner", secondary = practitioner_language_table, back_populates = "languages")  

    def __init__(self, **kwargs):
        """
        Initializes a Language object
        """
        self.name = kwargs.get("name")

    def serialize(self):
        """
        Serializes a language object
        """
        return {"id" : self.id, "name" : self.name, "practitioners" : [prac.simple_serialize() for prac in self.practitioners]}
    
    def simple_serialize(self):
        """
        Simple serializes a language object
        """
        return {"id" : self.id, "name" : self.name}
    

class Location(sql_db.Model):
    """
    Location Model
    """
    __tablename__ = "locations"
    id = sql_db.Column(sql_db.Integer, primary_key = True, autoincrement = True)
    name = sql_db.Column(sql_db.String, nullable = False)
    practitioners = sql_db.relationship("Practitioner", secondary = practitioner_location_table, back_populates = "locations")  

    def __init__(self, **kwargs):
        """
        Initializes a Location object
        """
        self.name = kwargs.get("name")

    def simple_serialize(self):
        """
        Simple serializes a location object
        """
        return {"id" : self.id, "name" : self.name}
    

class Specialization(sql_db.Model):
    """
    Specialization Model
    """
    __tablename__ = "specializations"
    id = sql_db.Column(sql_db.Integer, primary_key = True, autoincrement = True)
    name = sql_db.Column(sql_db.String, nullable = False)
    practitioners = sql_db.relationship("Practitioner", secondary = practitioner_specialization_table, back_populates = "specializations")  

    def __init__(self, **kwargs):
        """
        Initializes a Specialization object
        """
        self.name = kwargs.get("name")

    def simple_serialize(self):
        """
        Simple serializes a specialization object
        """
        return {"id" : self.id, "name" : self.name}
    
    
class PaymentMethod(sql_db.Model):
    """
    ::DEPRECATAED::
    Network Model
    """
    __tablename__ = "paymentmethods"
    id = sql_db.Column(sql_db.Integer, primary_key = True, autoincrement = True)
    name = sql_db.Column(sql_db.String, nullable = False)
    practitioners = sql_db.relationship("Practitioner", secondary = practitioner_network_table, back_populates = "paymentmethods")  

    def __init__(self, **kwargs):
        """
        Initializes a payment_method object
        """
        self.name = kwargs.get("name")

    def simple_serialize(self):
        """
        Simple serializes a payment_method object
        """
        return {"id" : self.id, "name" : self.name}
    

class Practice(sql_db.Model):
    """
    Practice Model
    """
    __tablename__ = "practices"
    id = sql_db.Column(sql_db.Integer, primary_key = True, autoincrement = True)
    name = sql_db.Column(sql_db.String, nullable = False)
    consultation = sql_db.relationship("Consultation", back_populates="practices", uselist = False)
    insurances = sql_db.relationship("Insurance", secondary = practice_insurance_table, back_populates = "practices")
    location = sql_db.Column(sql_db.String, nullable = False) #no relationship
    practitioners = sql_db.relationship("Practitioners", cascade = "delete")

    # missing member and head

    def __init__(self, kwargs):
        """Initializes Practice object"""
        self.name = kwargs.get("name")
        self.location = kwargs.get("location")

    def simple_serialize(self):
        """Simple serialize Practice"""
        return {
            "id" : self.id,
            "name" : self.name,
            "location" : self.location
        }

class Insurance(sql_db.Model):
    """Insurance Model"""
    __tablename__ = "insurances"
    name = sql_db.Column(sql_db.String, nullable = False)
    practices = sql_db.relationship("Practice", secondary = practice_insurance_table, back_populates = "insurances")

    def __init__(self, **kwargs):
        """
        Initializes a insurance object
        """
        self.name = kwargs.get("name")

    def simple_serialize(self):
        """
        Simple serializes a insurance object
        """
        return {"id" : self.id, "name" : self.name}


class Consultation(sql_db.Model):
    """Consultation Model"""
    __tablename__ = "consultations"
    id = sql_db.Column(sql_db.Integer, primary_key = True, autoincrement = True)
    patient_name = sql_db.Column(sql_db.String, nullable = False)
    patient_email = sql_db.Column(sql_db.String, nullable = False)
    patient_phone = sql_db.Column(sql_db.String, nullable = False)
    patient_area_of_need = sql_db.Column(sql_db.String, nullable = False)
    patient_state = sql_db.Column(sql_db.String, nullable = False)

    practitioner_id = sql_db.Column(sql_db.Integer, sql_db.ForeignKey('practitioners.id'), unique=True)
    practitioner = sql_db.relationship("Practitioner", back_populates="consultations")

    practice_id = sql_db.Column(sql_db.Integer, sql_db.ForeignKey('practices.id'), unique= True)
    practice = sql_db.relationship("Practice", back_populates="consultations")

    status = sql_db.Column(sql_db.String, nullable = False, default = "pending")
    patient_date_of_birth = sql_db.Column(sql_db.String, nullable = False)

    patient_genders = sql_db.relationship("Gender", secondary = patient_gender_table, back_populates = "consultations")
    is_deleted = sql_db.Column(sql_db.Boolean, default = False, nullable = False)

    def __init__(self, **kwargs):
        """Initializes Consultation object"""
        self.patient_name = kwargs.get("patient_name")
        self.patient_email = kwargs.get("patient_email")
        self.patient_phone = kwargs.get("patient_phone")
        self.patient_area_of_need = kwargs.get("patient_area_of_need")
        self.patient_state = kwargs.get("patient_state")
        self.practitioner_id = kwargs.get("practitioner_id")
        self.practice_id = kwargs.get("practice_id")
        self.patient_date_of_birth = kwargs.get("patient_date_of_birth")

    def simple_serialize(self):
        """Simple serialize consulation"""
        return {
            "id" : self.id, 
            "patient_name" : self.patient_name,
            "patient_email" : self.patient_email,
            "patient_phone" : self.patient_phone,
            "patient_area_of_need" : self.patient_area_of_need,
            "patient_state" : self.patient_state,
            "status" : self.status,
            "patient_date_of_birth" : self.patient_date_of_birth,
            "patient_genders" : [gender.simple_serialize() for gender in self.patient_genders],
        }



class Metric(sql_db.Model):
    """
    Metric Model
    """
    __tablename__ = "metrics"
    id = sql_db.Column(sql_db.Integer, primary_key = True, autoincrement = True)
    number_of_rejections = sql_db.Column(sql_db.String, default = 0, nullable = False)

    practitioner_id = sql_db.Column(sql_db.Integer, sql_db.ForeignKey('practitioners.id'), unique=True)
    practitioner = sql_db.relationship("Practitioner", back_populates="consultations")

    def __init__(self, kwargs):
        """Initializes Metric object"""
        self.number_of_rejections = kwargs.get("number_of_rejections")

    def simple_serialize(self):
        """
        Simple serialize Metric object
        """
        return {"id" : self.id, 
                "number_of_rejections" : self.number_of_rejections}



# get all consultation endpoint
# get all consultation given the practitioner id
# normal crud endpoints for consultation
    
# location of the practice to the Practice table