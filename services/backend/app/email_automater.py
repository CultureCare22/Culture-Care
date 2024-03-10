from Google import Create_Service
import base64
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from email.mime.text import MIMEText
import os
import dotenv
dotenv.load_dotenv()


def send_email(email_body, subject, sender, receiver, media):
    """
    Sends email(content) from sender to receiver

    Precond receiver: is the email address of the receiver
    Precond sender: is the email address of the sender
    Precond subject: is the subject of the email(str)
    Precond email: is the body of the email(str)
    Precond media: is a byte form of media content
    Precond media_type: is the format of the media to be sent(eg. pdf)
    Precond file_name: is the file name of the media content
    """
    CLIENT_SECRET_FILE = os.getenv("GMAIL_CLIENT_SECRET_FILE")
    GMAIL_SCOPES = ['https://mail.google.com/']
    service = Create_Service(CLIENT_SECRET_FILE, 'gmail', 'v1', GMAIL_SCOPES)

    emailMsg = email_body
    mimeMessage = MIMEMultipart()
    mimeMessage['to'] = receiver
    mimeMessage['subject'] = subject
    mimeMessage.attach(MIMEText(emailMsg, 'plain'))

    # media structure : [{body:"", "type": "", file_name: ""}]
    for medium in media:
        medium_attachment = MIMEApplication(medium["body"], medium["type"]) 
        medium_attachment.add_header('Content-Disposition', 'attachment', filename=medium["filename"]) 
        mimeMessage.attach(medium_attachment)


    raw_string = base64.urlsafe_b64encode(mimeMessage.as_bytes()).decode()
    
    try:
        message = service.users().messages().send(userId= sender, body={'raw': raw_string}).execute()
    except:
        return False, "Failed to send message"
    return True, "Sent message successfully"

