from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import smtplib
import os
from email.mime.text import MIMEText
from dotenv import load_dotenv

load_dotenv()

EMAIL = os.getenv("EMAIL")
PASSWORD = os.getenv("PASSWORD")

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

import smtplib
import traceback
from email.mime.text import MIMEText

@app.post("/contact")
def contact(data: Contact):
    try:
        print("Step 1")

        body = f"""
Name: {data.name}
Email: {data.email}
Subject: {data.subject}

Message:
{data.message}
"""

        msg = MIMEText(body)
        msg["Subject"] = f"Portfolio Contact - {data.subject}"
        msg["From"] = EMAIL
        msg["To"] = EMAIL

        print("Step 2")

        server = smtplib.SMTP("smtp.gmail.com", 587, timeout=20)

        print("Step 3")

        server.ehlo()

        print("Step 4")

        server.starttls()

        print("Step 5")

        server.login(EMAIL, PASSWORD)

        print("Step 6")

        server.send_message(msg)

        print("Step 7")

        server.quit()

        return {"success": True}

    except Exception as e:
        traceback.print_exc()
        return {
            "error": str(e),
            "type": type(e).__name__
        }