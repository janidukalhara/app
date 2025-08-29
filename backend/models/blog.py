from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List
import uuid
import re

def calculate_read_time(content: str) -> str:
    """Calculate estimated read time based on content length"""
    words = len(re.findall(r'\w+', content))
    minutes = max(1, round(words / 200))  # Average reading speed: 200 words/min
    return f"{minutes} min read"

class BlogPost(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str = Field(..., min_length=5, max_length=200)
    excerpt: str = Field(..., min_length=10, max_length=500)
    content: str = Field(..., min_length=50)
    category: str = Field(..., min_length=2, max_length=50)
    image: Optional[str] = None
    date: datetime = Field(default_factory=datetime.utcnow)
    read_time: str = Field(default="")
    published: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    def __init__(self, **data):
        super().__init__(**data)
        if not self.read_time and self.content:
            self.read_time = calculate_read_time(self.content)

class BlogPostCreate(BaseModel):
    title: str = Field(..., min_length=5, max_length=200)
    excerpt: str = Field(..., min_length=10, max_length=500)
    content: str = Field(..., min_length=50)
    category: str = Field(..., min_length=2, max_length=50)
    image: Optional[str] = None
    published: bool = Field(default=False)

class BlogPostUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=5, max_length=200)
    excerpt: Optional[str] = Field(None, min_length=10, max_length=500)
    content: Optional[str] = Field(None, min_length=50)
    category: Optional[str] = Field(None, min_length=2, max_length=50)
    image: Optional[str] = None
    published: Optional[bool] = None

class BlogPostsResponse(BaseModel):
    posts: List[BlogPost]
    total: int
    page: int
    per_page: int