from Google import Create_Service
import os
import dotenv
dotenv.load_dotenv()

import re
import datetime
import os.path
from googleapiclient.errors import HttpError


# If modifying these scopes, delete the file token.json.

def get_events():
  """
  Returns all events
  """
  try:
    GOOGLE_CLIENT_SECRET_FILE = os.getenv("GOOGLE_CLIENT_SECRET_FILE")

    print("here" , GOOGLE_CLIENT_SECRET_FILE)
    GCAL_SCOPES = ["https://www.googleapis.com/auth/calendar"]
    service = Create_Service(GOOGLE_CLIENT_SECRET_FILE, 'calendar', 'v3', GCAL_SCOPES)
    now = datetime.datetime.now()

    two_weeks_later = now + datetime.timedelta(weeks=2)

    iso_datetime = two_weeks_later.isoformat() + "Z"
    events_result = (
        service.events()
        .list(
            calendarId="primary",
            timeMin=datetime.datetime.now().isoformat() + "Z",
            singleEvents=True,
            orderBy="startTime",
            timeMax = iso_datetime
        )
        .execute()
    )
    events = events_result.get("items", [])
    res = []
    for event in events:
      # event["start"]
      # meeting_id
      # accept or decline endpoint
      res.append({"start" : event["start"], "id" :  event["id"], "description" : event["description"], "status" : event["status"]})
    return res
  except HttpError as error:
    print(f"An error occurred: {error}")



def update_event_status(id, status):
  # First retrieve the event from the API.
  try:
    GOOGLE_CLIENT_SECRET_FILE = os.getenv("GOOGLE_CLIENT_SECRET_FILE")

    print("here" , GOOGLE_CLIENT_SECRET_FILE)
    GCAL_SCOPES = ["https://www.googleapis.com/auth/calendar"]
    service = Create_Service(GOOGLE_CLIENT_SECRET_FILE, 'calendar', 'v3', GCAL_SCOPES)
    if status == "cancelled" : 
      service.events().delete(calendarId='primary', eventId= id).execute()
      return status
    elif status in set(["tentative", "confirmed"]): 
      event = service.events().get(calendarId='primary', eventId = id).execute()
      event['status'] = status
      service.events().update(calendarId='primary', eventId=event['id'], body=event).execute()
      return status
    else: return "invalid status"
  except HttpError as error:
    return "event does not exists"


def appts():
  x = get_events()
  appts = {}
  for appt in x:
    descr = appt["description"]
    descr = descr.split("\n")
    to_remove = ["<br>", "<b>", "</br>", "</b>"]
    p = re.compile('|'.join(map(re.escape, to_remove))) 
    descr = [p.sub('', i) for i in descr]
    temp = {}
    clinician = None
    for i, j in enumerate(descr):
      if i == 1:
        temp["patient name"] = j.strip().rstrip()
      if i == 7:
        clinician = j.strip().rstrip()
      if i == 9:
        temp["paymentmethod"] = j.strip().rstrip()
    if clinician is not None:
      appt["description"] = temp
      if clinician not in appts:
        appts[clinician] = [appt]
      else:
        appts[clinician].append(appt)

      
  return appts


    

