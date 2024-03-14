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
  GOOGLE_CLIENT_SECRET_FILE = os.getenv("GOOGLE_CLIENT_SECRET_FILE")
  GCAL_SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"]

  try:
    service = Create_Service(GOOGLE_CLIENT_SECRET_FILE, 'calendar', 'v3', GCAL_SCOPES)
    now = datetime.datetime.utcnow()

    two_weeks_later = now + datetime.timedelta(weeks=2)

    iso_datetime = two_weeks_later.isoformat() + "Z"
    events_result = (
        service.events()
        .list(
            calendarId="primary",
            timeMin=datetime.datetime.utcnow().isoformat() + "Z",
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
        temp["patient name"] = j
      if i == 7:
        clinician = j
      if i == 9:
        temp["paymentmethod"] = j
    if clinician is not None:
      appt["description"] = temp
      if clinician not in appts:
        appts[clinician] = [appt]
      else:
        appts[clinician].append(appt)

      
  return appts

print(appts())
    



