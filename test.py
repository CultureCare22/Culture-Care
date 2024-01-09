from pymongo import MongoClient

CLIENT = MongoClient("mongodb://localhost:27017")

mongo_db = CLIENT["trydb"]

forms_collection = mongo_db["forms_collection"]

id = forms_collection.insert_one({"name": "Ambrose"}).inserted_id
print(id)



