from fastapi import FastAPI, APIRouter, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import Optional, List
from datetime import datetime

# Import models
from models.contact import ContactSubmission, ContactSubmissionCreate, ContactSubmissionResponse
from models.blog import BlogPost, BlogPostCreate, BlogPostUpdate, BlogPostsResponse, calculate_read_time
from models.testimonial import Testimonial, TestimonialCreate, TestimonialResponse
from models.project import Project, ProjectCreate, ProjectsResponse

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(title="Janidu Portfolio API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"], 
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Root endpoint
@api_router.get("/")
async def root():
    return {"message": "Janidu Portfolio API", "status": "active"}

# Contact endpoints
@api_router.post("/contact", response_model=ContactSubmissionResponse)
async def submit_contact_form(contact_data: ContactSubmissionCreate):
    """Submit contact form"""
    try:
        contact = ContactSubmission(**contact_data.dict())
        await db.contacts.insert_one(contact.dict())
        
        # TODO: Send email notification here
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
    """Get all contact submissions (admin only - basic implementation)"""
    try:
        contacts = await db.contacts.find().sort("created_at", -1).to_list(100)
        return {"contacts": contacts}
    except Exception as e:
        logger.error(f"Error fetching contacts: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch contacts")

# Blog endpoints  
@api_router.get("/blog", response_model=BlogPostsResponse)
async def get_blog_posts(
    category: Optional[str] = Query(None, description="Filter by category"),
    page: int = Query(1, ge=1, description="Page number"),
    per_page: int = Query(10, ge=1, le=50, description="Posts per page")
):
    """Get published blog posts with optional filtering and pagination"""
    try:
        skip = (page - 1) * per_page
        
        # Build query
        query = {"published": True}
        if category:
            query["category"] = category
            
        # Get posts with pagination
        posts_cursor = db.blog_posts.find(query).sort("date", -1).skip(skip).limit(per_page)
        posts = await posts_cursor.to_list(per_page)
        
        # Get total count
        total = await db.blog_posts.count_documents(query)
        
        # Convert to BlogPost models
        blog_posts = [BlogPost(**post) for post in posts]
        
        return BlogPostsResponse(
            posts=blog_posts,
            total=total,
            page=page,
            per_page=per_page
        )
    except Exception as e:
        logger.error(f"Error fetching blog posts: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch blog posts")

@api_router.get("/blog/{post_id}", response_model=BlogPost)
async def get_blog_post(post_id: str):
    """Get single blog post by ID"""
    try:
        post = await db.blog_posts.find_one({"id": post_id, "published": True})
        if not post:
            raise HTTPException(status_code=404, detail="Blog post not found")
        
        return BlogPost(**post)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching blog post {post_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch blog post")

@api_router.post("/blog", response_model=BlogPost)
async def create_blog_post(post_data: BlogPostCreate):
    """Create new blog post (admin only - basic implementation)"""
    try:
        blog_post = BlogPost(**post_data.dict())
        blog_post.read_time = calculate_read_time(blog_post.content)
        
        await db.blog_posts.insert_one(blog_post.dict())
        logger.info(f"Created blog post: {blog_post.title}")
        
        return blog_post
    except Exception as e:
        logger.error(f"Error creating blog post: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create blog post")

# Testimonials endpoints
@api_router.get("/testimonials", response_model=TestimonialResponse)
async def get_testimonials():
    """Get approved testimonials"""
    try:
        testimonials = await db.testimonials.find({"approved": True}).sort("created_at", -1).to_list(100)
        testimonial_objects = [Testimonial(**testimonial) for testimonial in testimonials]
        
        return TestimonialResponse(testimonials=testimonial_objects)
    except Exception as e:
        logger.error(f"Error fetching testimonials: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch testimonials")

@api_router.post("/testimonials", response_model=Testimonial)
async def submit_testimonial(testimonial_data: TestimonialCreate):
    """Submit new testimonial for approval"""
    try:
        testimonial = Testimonial(**testimonial_data.dict())
        await db.testimonials.insert_one(testimonial.dict())
        
        logger.info(f"New testimonial submitted by {testimonial.name}")
        return testimonial
    except Exception as e:
        logger.error(f"Error submitting testimonial: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit testimonial")

# Projects endpoints
@api_router.get("/projects", response_model=ProjectsResponse) 
async def get_projects(
    category: Optional[str] = Query(None, description="Filter by category"),
    featured: Optional[bool] = Query(None, description="Filter by featured status")
):
    """Get projects with optional filtering"""
    try:
        # Build query
        query = {}
        if category and category != "All":
            query["category"] = category
        if featured is not None:
            query["featured"] = featured
            
        projects = await db.projects.find(query).sort("created_at", -1).to_list(100)
        project_objects = [Project(**project) for project in projects]
        
        return ProjectsResponse(projects=project_objects)
    except Exception as e:
        logger.error(f"Error fetching projects: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch projects")

@api_router.post("/projects", response_model=Project)
async def create_project(project_data: ProjectCreate):
    """Create new project (admin only - basic implementation)"""
    try:
        project = Project(**project_data.dict())
        await db.projects.insert_one(project.dict())
        
        logger.info(f"Created project: {project.title}")
        return project
    except Exception as e:
        logger.error(f"Error creating project: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create project")

# Include the router in the main app
app.include_router(api_router)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)