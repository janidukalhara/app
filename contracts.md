# Portfolio Backend API Contracts

## Overview
This document outlines the API contracts for Janidu Kalhara Perera's portfolio website, detailing what's currently mocked in frontend and what needs to be implemented in the backend.

## Current Mock Data (frontend/src/data/mock.js)
- **personalInfo**: Static profile information
- **skills**: Skills categorized by technology areas
- **education**: Academic qualifications and timeline
- **projects**: Project showcase with filtering capabilities
- **testimonials**: Client testimonials with ratings
- **blogPosts**: Blog articles with categories and content

## Backend Implementation Required

### 1. Contact Form API
**Endpoint**: `POST /api/contact`
**Purpose**: Handle contact form submissions with email notifications

**Request Body**:
```json
{
  "name": "string",
  "email": "string", 
  "subject": "string",
  "message": "string"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Message sent successfully",
  "id": "contact_id"
}
```

**Database Model**: ContactSubmission
- name: String (required)
- email: String (required, validated)
- subject: String (required)
- message: String (required)
- createdAt: Date (auto)
- isRead: Boolean (default: false)

### 2. Blog Management API

#### Get All Blog Posts
**Endpoint**: `GET /api/blog`
**Purpose**: Retrieve published blog posts with pagination

**Query Parameters**:
- category: string (optional filter)
- limit: number (default: 10)
- skip: number (default: 0)

**Response**:
```json
{
  "posts": [
    {
      "id": "string",
      "title": "string",
      "excerpt": "string", 
      "content": "string",
      "category": "string",
      "date": "ISO date",
      "readTime": "string",
      "image": "string (URL)",
      "published": true
    }
  ],
  "total": "number"
}
```

#### Get Single Blog Post
**Endpoint**: `GET /api/blog/:id`
**Purpose**: Retrieve specific blog post by ID

#### Create Blog Post (Admin)
**Endpoint**: `POST /api/blog`
**Purpose**: Create new blog post

**Request Body**:
```json
{
  "title": "string",
  "excerpt": "string",
  "content": "string", 
  "category": "string",
  "image": "string",
  "published": false
}
```

**Database Model**: BlogPost
- title: String (required)
- excerpt: String (required)
- content: String (required) 
- category: String (required)
- image: String (URL)
- date: Date (auto)
- readTime: String (calculated)
- published: Boolean (default: false)
- createdAt: Date (auto)
- updatedAt: Date (auto)

### 3. Testimonials API

#### Get All Testimonials
**Endpoint**: `GET /api/testimonials`
**Purpose**: Retrieve approved testimonials

**Response**:
```json
{
  "testimonials": [
    {
      "id": "string",
      "name": "string",
      "position": "string",
      "company": "string", 
      "content": "string",
      "avatar": "string (URL)",
      "rating": "number (1-5)",
      "approved": true
    }
  ]
}
```

#### Submit Testimonial
**Endpoint**: `POST /api/testimonials`
**Purpose**: Submit new testimonial for approval

**Database Model**: Testimonial
- name: String (required)
- position: String (required) 
- company: String (required)
- content: String (required)
- avatar: String (URL, optional)
- rating: Number (1-5, default: 5)
- approved: Boolean (default: false)
- createdAt: Date (auto)

### 4. Project Showcase API

#### Get All Projects
**Endpoint**: `GET /api/projects`
**Purpose**: Retrieve portfolio projects with filtering

**Query Parameters**:
- category: string (optional filter)
- featured: boolean (optional filter)

**Response**:
```json
{
  "projects": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "technologies": ["array of strings"],
      "category": "string",
      "image": "string (URL)",
      "githubUrl": "string",
      "liveUrl": "string", 
      "featured": "boolean"
    }
  ]
}
```

**Database Model**: Project
- title: String (required)
- description: String (required)
- technologies: [String] (required)
- category: String (required)
- image: String (URL)
- githubUrl: String (URL)
- liveUrl: String (URL)
- featured: Boolean (default: false)
- createdAt: Date (auto)

## Frontend Integration Plan

### 1. API Service Layer
Create `frontend/src/services/api.js` for centralized API calls:
- contactService: Handle contact form submissions
- blogService: Fetch blog posts and single articles  
- testimonialService: Get testimonials and submit new ones
- projectService: Fetch projects with filtering

### 2. State Management
Update components to use real API data:
- **Contact.jsx**: Replace mock form submission with real API call
- **Blog.jsx**: Replace mock blog data with API fetched posts
- **Testimonials.jsx**: Replace mock testimonials with API data
- **Projects.jsx**: Replace mock projects with API data

### 3. Loading States
Add loading indicators for:
- Contact form submission
- Blog posts loading
- Project filtering
- Testimonials loading

### 4. Error Handling
Implement error states for:
- Network failures
- Server errors
- Validation errors
- Form submission failures

## Environment Variables Required

### Backend (.env)
```
MONGO_URL=mongodb://localhost:27017/portfolio
DB_NAME=portfolio
EMAIL_SERVICE_API_KEY=<for contact form notifications>
EMAIL_FROM=noreply@janidukalhara.com
EMAIL_TO=janidukalhara999@gmail.com
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=<existing backend URL>
```

## Security Considerations
- Input validation and sanitization
- Rate limiting on contact form
- CORS configuration
- Email validation
- XSS protection for blog content
- Admin authentication for blog/project management

## Testing Strategy
- Unit tests for API endpoints
- Integration tests for database operations
- Frontend component testing with mock API responses
- End-to-end testing for contact form and blog functionality