from fastapi import FastAPI, APIRouter, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from pathlib import Path
from typing import Optional
from datetime import datetime
from uuid import uuid4

# Import models
from models.contact import ContactSubmission, ContactSubmissionCreate, ContactSubmissionResponse
from models.blog import BlogPost, BlogPostCreate, BlogPostUpdate, BlogPostsResponse, calculate_read_time
from models.testimonial import Testimonial, TestimonialCreate, TestimonialResponse
from models.project import Project, ProjectCreate, ProjectsResponse
from pydantic import BaseModel, EmailStr

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

MONGO_URL = os.getenv("MONGO_URL", "mongodb+srv://janidukalhara99_db_user:QGRFDV1cn9zoxVki@cluster0.rjhl6me.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
DB_NAME = os.getenv("DB_NAME", "portfolio")
FRONTEND_URL = os.getenv("FRONTEND_URL", "https://janiduperera.netlify.app/")

# MongoDB client
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# FastAPI app
app = FastAPI(title="Janidu Portfolio API", version="1.0.0")
api_router = APIRouter(prefix="/api")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[FRONTEND_URL],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ---------------------
# SMTP Email Function
# ---------------------
def send_contact_email(name: str, sender_email: str, subject: str, message: str):
    receiver_email = os.getenv("EMAIL_TO")
    smtp_user = os.getenv("EMAIL_USER")
    smtp_password = os.getenv("EMAIL_PASSWORD")

    if not all([receiver_email, smtp_user, smtp_password]):
        raise Exception("Email environment variables not set")

    msg = MIMEMultipart()
    msg["From"] = smtp_user
    msg["To"] = receiver_email
    msg["Subject"] = f"Portfolio Contact Form: {subject}"

    body = f"""
New message from portfolio contact form:

Name: {name}
Email: {sender_email}
Subject: {subject}
Message: {message}
"""
    msg.attach(MIMEText(body, "plain"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(smtp_user, smtp_password)
        server.send_message(msg)
    logger.info(f"Email sent to {receiver_email} from {sender_email}")

# ---------------------
# Root & Health
# ---------------------
@api_router.get("/")
async def root():
    return {"message": "Janidu Portfolio API", "status": "active"}

# ---------------------
# Contact Endpoints
# ---------------------
@api_router.post("/contact", response_model=ContactSubmissionResponse)
async def submit_contact_form(contact_data: ContactSubmissionCreate):
    try:
        contact = ContactSubmission(**contact_data.dict())
        await db.contacts.insert_one(contact.dict())

        # Send email
        try:
            send_contact_email(
                name=contact.name,
                sender_email=contact.email,
                subject=contact.subject or "No Subject",
                message=contact.message
            )
        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")
            return ContactSubmissionResponse(
                success=True,
                message=f"Message saved but failed to send email: {str(e)}",
                id=contact.id
            )

        logger.info(f"New contact submission from {contact.email}")
        return ContactSubmissionResponse(
            success=True,
            message="Thank you for your message! I'll get back to you soon.",
            id=contact.id
        )
    except Exception as e:
        logger.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")

@api_router.get("/contact")
async def get_contact_submissions():
    try:
        contacts = await db.contacts.find().sort("created_at", -1).to_list(100)
        return {"contacts": contacts}
    except Exception as e:
        logger.error(f"Error fetching contacts: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch contacts")

# ---------------------
# Blog Endpoints
# ---------------------
@api_router.get("/blog", response_model=BlogPostsResponse)
async def get_blog_posts(
    category: Optional[str] = Query(None),
    page: int = Query(1, ge=1),
    per_page: int = Query(10, ge=1, le=50)
):
    try:
        skip = (page - 1) * per_page
        query = {"published": True}
        if category:
            query["category"] = category
        posts_cursor = db.blog_posts.find(query).sort("date", -1).skip(skip).limit(per_page)
        posts = await posts_cursor.to_list(per_page)
        total = await db.blog_posts.count_documents(query)
        blog_posts = [BlogPost(**post) for post in posts]
        return BlogPostsResponse(posts=blog_posts, total=total, page=page, per_page=per_page)
    except Exception as e:
        logger.error(f"Error fetching blog posts: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch blog posts")

@api_router.get("/blog/{post_id}", response_model=BlogPost)
async def get_blog_post(post_id: str):
    try:
        post = await db.blog_posts.find_one({"id": post_id, "published": True})
        if not post:
            raise HTTPException(status_code=404, detail="Blog post not found")
        return BlogPost(**post)
    except Exception as e:
        logger.error(f"Error fetching blog post {post_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch blog post")

@api_router.post("/blog", response_model=BlogPost)
async def create_blog_post(post_data: BlogPostCreate):
    try:
        blog_post = BlogPost(**post_data.dict())
        blog_post.read_time = calculate_read_time(blog_post.content)
        await db.blog_posts.insert_one(blog_post.dict())
        logger.info(f"Created blog post: {blog_post.title}")
        return blog_post
    except Exception as e:
        logger.error(f"Error creating blog post: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create blog post")

# ---------------------
# Testimonials
# ---------------------
@api_router.get("/testimonials", response_model=TestimonialResponse)
async def get_testimonials():
    try:
        testimonials = await db.testimonials.find({"approved": True}).sort("created_at", -1).to_list(100)
        testimonial_objects = [Testimonial(**t) for t in testimonials]
        return TestimonialResponse(testimonials=testimonial_objects)
    except Exception as e:
        logger.error(f"Error fetching testimonials: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch testimonials")

@api_router.post("/testimonials", response_model=Testimonial)
async def submit_testimonial(testimonial_data: TestimonialCreate):
    try:
        testimonial = Testimonial(**testimonial_data.dict())
        await db.testimonials.insert_one(testimonial.dict())
        logger.info(f"New testimonial submitted by {testimonial.name}")
        return testimonial
    except Exception as e:
        logger.error(f"Error submitting testimonial: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit testimonial")

# ---------------------
# Projects
# ---------------------
@api_router.get("/projects", response_model=ProjectsResponse)
async def get_projects(category: Optional[str] = None, featured: Optional[bool] = None):
    try:
        query = {}
        if category and category != "All":
            query["category"] = category
        if featured is not None:
            query["featured"] = featured
        projects = await db.projects.find(query).sort("created_at", -1).to_list(100)
        project_objects = [Project(**p) for p in projects]
        return ProjectsResponse(projects=project_objects)
    except Exception as e:
        logger.error(f"Error fetching projects: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch projects")

@api_router.post("/projects", response_model=Project)
async def create_project(project_data: ProjectCreate):
    try:
        project = Project(**project_data.dict())
        await db.projects.insert_one(project.dict())
        logger.info(f"Created project: {project.title}")
        return project
    except Exception as e:
        logger.error(f"Error creating project: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create project")

# Include router
app.include_router(api_router)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
