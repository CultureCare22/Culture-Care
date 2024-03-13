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
      res.append(event["description"])
    return res
  except HttpError as error:
    print(f"An error occurred: {error}")


def appts():
  x = get_events()

  x_prime_prime = []
  for i in x:
    x_prime_prime.append(i.split("\n"))
  x_prime = []
  to_remove = ["<br>", "<b>", "</br>", "</b>"]
  for j in x_prime_prime:
    p = re.compile('|'.join(map(re.escape, to_remove))) 
    x_prime.append([p.sub('', i) for i in j])
  appts = []
  for appt in x_prime:
    temp = {}
    for i, j in enumerate(appt):
      if i == 1:
        temp["patient name"] = j
      if i == 7:
        temp["clinician name"] = j
      if i == 9:
        temp["paymentmethod"] = j
      
    appts.append(temp)
  return appts
    


