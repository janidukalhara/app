from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List
import uuid

class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = Field(..., min_length=2, max_length=100)
    position: str = Field(..., min_length=2, max_length=100)
    company: str = Field(..., min_length=2, max_length=100)
    content: str = Field(..., min_length=10, max_length=1000)
    avatar: Optional[str] = None
    rating: int = Field(default=5, ge=1, le=5)
    approved: bool = Field(default=False)
    created_at: datetime = Field(default_factory=datetime.utcnow)

class TestimonialCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    position: str = Field(..., min_length=2, max_length=100)
    company: str = Field(..., min_length=2, max_length=100)
    content: str = Field(..., min_length=10, max_length=1000)
    avatar: Optional[str] = None
    rating: int = Field(default=5, ge=1, le=5)

class TestimonialResponse(BaseModel):
    testimonials: List[Testimonial]