from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List
import uuid

class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str = Field(..., min_length=3, max_length=200)
    description: str = Field(..., min_length=10, max_length=1000)
    technologies: List[str] = Field(..., min_items=1)
    category: str = Field(..., min_length=2, max_length=50)
    image: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    featured: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ProjectCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=200)
    description: str = Field(..., min_length=10, max_length=1000)
    technologies: List[str] = Field(..., min_items=1)
    category: str = Field(..., min_length=2, max_length=50)
    image: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    featured: bool = Field(default=False)

class ProjectsResponse(BaseModel):
    projects: List[Project]