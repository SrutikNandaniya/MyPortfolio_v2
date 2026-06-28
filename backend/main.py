from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import smtplib
import os
from email.mime.text import MIMEText
from dotenv import load_dotenv
import resend

load_dotenv()

EMAIL = os.getenv("EMAIL")
PASSWORD = os.getenv("PASSWORD")
RESEND_API_KEY = os.getenv("RESEND_API_KEY")
resend.api_key = RESEND_API_KEY

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://srutikndn1.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Contact(BaseModel):
    name: str
    email: str
    subject: str
    message: str

# @app.post("/contact")
# def contact(data: Contact):
#     body = f"""
# Name: {data.name}
# Email: {data.email}
# Subject: {data.subject}

# Message:
# {data.message}
# """

#     msg = MIMEText(body)
#     msg["Subject"] = f"Portfolio Contact - {data.subject}"
#     msg["From"] = EMAIL
#     msg["To"] = EMAIL

#     with smtplib.SMTP("smtp.gmail.com", 587) as server:
#         server.starttls()
#         server.login(EMAIL, PASSWORD)
#         server.send_message(msg)

#     return {"success": True}
@app.post("/contact")
def contact(data: Contact):

    html = f"""
    <h2>New Portfolio Contact</h2>

    <p><strong>Name:</strong> {data.name}</p>

    <p><strong>Email:</strong> {data.email}</p>

    <p><strong>Subject:</strong> {data.subject}</p>

    <p><strong>Message:</strong></p>

    <p>{data.message}</p>
    """

    resend.Emails.send({
        "from": "Portfolio <onboarding@resend.dev>",
        "to": ["srutikndn@gmail.com"],
        "subject": f"Portfolio Contact - {data.subject}",
        "html": html,
    })

    return {"success": True}

