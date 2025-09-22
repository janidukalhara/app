from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field, EmailStr
from datetime import datetime
from typing import Optional
import uuid
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

router = APIRouter()

# -----------------------------
# Pydantic Models
# -----------------------------
class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=5, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)
    is_read: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ContactSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr  
    subject: str = Field(..., min_length=5, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)

class ContactSubmissionResponse(BaseModel):
    success: bool
    message: str
    id: Optional[str] = None

# -----------------------------
# SMTP Email Function
# -----------------------------
def send_email(name: str, sender_email: str, subject: str, message: str):
    # Get environment variables
    receiver_email = os.getenv("EMAIL_TO")         # Your personal email
    smtp_user = os.getenv("EMAIL_USER")           # Your Gmail address
    smtp_password = os.getenv("EMAIL_PASSWORD")   # Your Gmail App Password

    if not all([receiver_email, smtp_user, smtp_password]):
        raise HTTPException(status_code=500, detail="Email configuration not found")

    # Create email message
    msg = MIMEMultipart()
    msg['From'] = smtp_user
    msg['To'] = receiver_email
    msg['Subject'] = f"Portfolio Contact Form: {subject}"

    body = f"""
    You received a new message from your portfolio contact form:

    Name: {name}
    Email: {sender_email}
    Subject: {subject}
    Message: {message}
    """
    msg.attach(MIMEText(body, 'plain'))

    # Send email via Gmail SMTP
    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(smtp_user, smtp_password)
            server.send_message(msg)
    except Exception as e:
        print("Error sending email:", e)
        raise HTTPException(status_code=500, detail="Failed to send email")

# -----------------------------
# FastAPI Endpoint
# -----------------------------
@router.post("/contact", response_model=ContactSubmissionResponse)
def submit_contact(contact: ContactSubmissionCreate):
    # Send email
    send_email(contact.name, contact.email, contact.subject, contact.message)

    # Generate a unique submission ID
    submission_id = str(uuid.uuid4())

    return ContactSubmissionResponse(
        success=True,
        message="Message sent successfully!",
        id=submission_id
    )
