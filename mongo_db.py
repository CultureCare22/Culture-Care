from pymongo import MongoClient
# import datetime, pymongo
from pprint import pprint
from bson.objectid import ObjectId


CLIENT = MongoClient("mongodb://localhost:27017/")
mongo_db = CLIENT["culturecaremongodb"]


forms_collection = mongo_db["forms_collection"]

def find_form_by_id(id):
    """
    Returns forms given id
    """
    print("id", id)
    form = forms_collection.find_one({"_id" : ObjectId(id)})

    if not form:
        return False, None
    
    return True, form


def insert_into_forms_collection(**kwargs):
    """
    Add record to forms_collection
    """
    form = {
        "type" : kwargs.get("type"),
        "data" : kwargs.get("data"),
        "deleted" : False
    }

    try:
        form_id = forms_collection.insert_one(form).inserted_id
    except:
        return False, None
    
    return True, str(form_id)

# data = {
#     "name" : "",
#     "age_group" : "",
#     "location" : "",  # check if location is valid
#     "directory_discovered" : "",
#     "area_of_concern" : "",
#     "total_therapies" : "",
#     "email" : "", #  check if email is valid
#     "practitioner_id" : ""
# }

# intake_form_template = """Hello Mrs. {practitioner_name}, 

# I hope you are well. My name is {name}. I am {age_group} in
# {location}. I found you on {directory_discovered}. I am reaching
# out because I am interested in receiving therapy for {area_of_concern}.
# This is my {total_therapies}'th time receiving therapy. My email is {email}.

# Is there any way I can begin the process with you?

# Sincerely,
# {name}.
# """






