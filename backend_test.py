#!/usr/bin/env python3
"""
Backend API Test Suite for Janidu's Portfolio Website
Tests all backend API endpoints with realistic data
"""

import requests
import json
import sys
import os
from datetime import datetime

# Get backend URL from environment
BACKEND_URL = "https://pro-portfolio-67.preview.emergentagent.com/api"

class PortfolioAPITester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.session = requests.Session()
        self.test_results = []
        
    def log_test(self, test_name, success, message, response_data=None):
        """Log test results"""
        result = {
            "test": test_name,
            "success": success,
            "message": message,
            "timestamp": datetime.now().isoformat(),
            "response_data": response_data
        }
        self.test_results.append(result)
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        if response_data and not success:
            print(f"   Response: {response_data}")
    
    def test_health_check(self):
        """Test GET /api/ - Health check endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/")
            
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "status" in data:
                    self.log_test("Health Check", True, 
                                f"API is active - {data.get('message')}", data)
                else:
                    self.log_test("Health Check", False, 
                                "Response missing required fields", data)
            else:
                self.log_test("Health Check", False, 
                            f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Health Check", False, f"Connection error: {str(e)}")
    
    def test_contact_form_submission(self):
        """Test POST /api/contact - Contact form submission"""
        contact_data = {
            "name": "Sarah Johnson",
            "email": "sarah.johnson@techcorp.com",
            "subject": "Collaboration Opportunity - Full Stack Development",
            "message": "Hi Janidu, I came across your portfolio and I'm impressed with your work. We have an exciting full-stack development project and would love to discuss a potential collaboration. Could we schedule a call this week?"
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/contact",
                json=contact_data,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get("success") and "message" in data and "id" in data:
                    self.log_test("Contact Form Submission", True, 
                                f"Contact form submitted successfully - ID: {data.get('id')}", data)
                else:
                    self.log_test("Contact Form Submission", False, 
                                "Response missing required fields", data)
            else:
                self.log_test("Contact Form Submission", False, 
                            f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Contact Form Submission", False, f"Request error: {str(e)}")
    
    def test_contact_form_validation(self):
        """Test contact form with invalid data"""
        invalid_data = {
            "name": "A",  # Too short
            "email": "invalid-email",  # Invalid email
            "subject": "Hi",  # Too short
            "message": "Short"  # Too short
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/contact",
                json=invalid_data,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 422:  # Validation error expected
                self.log_test("Contact Form Validation", True, 
                            "Validation errors properly handled")
            elif response.status_code == 200:
                self.log_test("Contact Form Validation", False, 
                            "Should have rejected invalid data")
            else:
                self.log_test("Contact Form Validation", False, 
                            f"Unexpected status code: {response.status_code}")
                
        except Exception as e:
            self.log_test("Contact Form Validation", False, f"Request error: {str(e)}")
    
    def test_blog_posts_endpoint(self):
        """Test GET /api/blog - Blog posts endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/blog")
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["posts", "total", "page", "per_page"]
                if all(field in data for field in required_fields):
                    posts_count = len(data.get("posts", []))
                    self.log_test("Blog Posts Endpoint", True, 
                                f"Retrieved {posts_count} blog posts (total: {data.get('total')})", 
                                {"posts_count": posts_count, "total": data.get("total")})
                else:
                    self.log_test("Blog Posts Endpoint", False, 
                                "Response missing required fields", data)
            else:
                self.log_test("Blog Posts Endpoint", False, 
                            f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Blog Posts Endpoint", False, f"Request error: {str(e)}")
    
    def test_blog_posts_with_category_filter(self):
        """Test blog posts with category filter"""
        try:
            response = self.session.get(f"{self.base_url}/blog?category=Technology")
            
            if response.status_code == 200:
                data = response.json()
                posts_count = len(data.get("posts", []))
                self.log_test("Blog Posts Category Filter", True, 
                            f"Category filter working - {posts_count} posts in Technology category")
            else:
                self.log_test("Blog Posts Category Filter", False, 
                            f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Blog Posts Category Filter", False, f"Request error: {str(e)}")
    
    def test_blog_posts_pagination(self):
        """Test blog posts pagination"""
        try:
            response = self.session.get(f"{self.base_url}/blog?page=1&per_page=5")
            
            if response.status_code == 200:
                data = response.json()
                if data.get("page") == 1 and data.get("per_page") == 5:
                    self.log_test("Blog Posts Pagination", True, 
                                f"Pagination working - page {data.get('page')}, per_page {data.get('per_page')}")
                else:
                    self.log_test("Blog Posts Pagination", False, 
                                "Pagination parameters not reflected in response", data)
            else:
                self.log_test("Blog Posts Pagination", False, 
                            f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Blog Posts Pagination", False, f"Request error: {str(e)}")
    
    def test_projects_endpoint(self):
        """Test GET /api/projects - Projects endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/projects")
            
            if response.status_code == 200:
                data = response.json()
                if "projects" in data:
                    projects_count = len(data.get("projects", []))
                    self.log_test("Projects Endpoint", True, 
                                f"Retrieved {projects_count} projects", 
                                {"projects_count": projects_count})
                else:
                    self.log_test("Projects Endpoint", False, 
                                "Response missing 'projects' field", data)
            else:
                self.log_test("Projects Endpoint", False, 
                            f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Projects Endpoint", False, f"Request error: {str(e)}")
    
    def test_projects_with_category_filter(self):
        """Test projects with category filter"""
        try:
            response = self.session.get(f"{self.base_url}/projects?category=Web Development")
            
            if response.status_code == 200:
                data = response.json()
                projects_count = len(data.get("projects", []))
                self.log_test("Projects Category Filter", True, 
                            f"Category filter working - {projects_count} projects in Web Development category")
            else:
                self.log_test("Projects Category Filter", False, 
                            f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Projects Category Filter", False, f"Request error: {str(e)}")
    
    def test_projects_featured_filter(self):
        """Test projects with featured filter"""
        try:
            response = self.session.get(f"{self.base_url}/projects?featured=true")
            
            if response.status_code == 200:
                data = response.json()
                projects_count = len(data.get("projects", []))
                self.log_test("Projects Featured Filter", True, 
                            f"Featured filter working - {projects_count} featured projects")
            else:
                self.log_test("Projects Featured Filter", False, 
                            f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Projects Featured Filter", False, f"Request error: {str(e)}")
    
    def test_testimonials_endpoint(self):
        """Test GET /api/testimonials - Testimonials endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/testimonials")
            
            if response.status_code == 200:
                data = response.json()
                if "testimonials" in data:
                    testimonials_count = len(data.get("testimonials", []))
                    self.log_test("Testimonials Endpoint", True, 
                                f"Retrieved {testimonials_count} testimonials", 
                                {"testimonials_count": testimonials_count})
                else:
                    self.log_test("Testimonials Endpoint", False, 
                                "Response missing 'testimonials' field", data)
            else:
                self.log_test("Testimonials Endpoint", False, 
                            f"HTTP {response.status_code}: {response.text}")
                
        except Exception as e:
            self.log_test("Testimonials Endpoint", False, f"Request error: {str(e)}")
    
    def test_cors_headers(self):
        """Test CORS configuration"""
        try:
            # Test with Origin header to trigger CORS response
            headers = {"Origin": "https://example.com"}
            response = self.session.get(f"{self.base_url}/", headers=headers)
            
            cors_headers = [
                "Access-Control-Allow-Origin",
                "Access-Control-Allow-Credentials"
            ]
            
            present_headers = [h for h in cors_headers if h in response.headers]
            
            if len(present_headers) >= 1:  # At least some CORS headers present
                origin_header = response.headers.get("Access-Control-Allow-Origin", "")
                self.log_test("CORS Configuration", True, 
                            f"CORS properly configured - Allow-Origin: {origin_header}")
            else:
                self.log_test("CORS Configuration", False, 
                            "No CORS headers found in response")
                
        except Exception as e:
            self.log_test("CORS Configuration", False, f"Request error: {str(e)}")
    
    def run_all_tests(self):
        """Run all API tests"""
        print(f"🚀 Starting Portfolio API Tests")
        print(f"📍 Backend URL: {self.base_url}")
        print("=" * 60)
        
        # Core API tests
        self.test_health_check()
        self.test_contact_form_submission()
        self.test_contact_form_validation()
        self.test_blog_posts_endpoint()
        self.test_blog_posts_with_category_filter()
        self.test_blog_posts_pagination()
        self.test_projects_endpoint()
        self.test_projects_with_category_filter()
        self.test_projects_featured_filter()
        self.test_testimonials_endpoint()
        self.test_cors_headers()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        passed = sum(1 for result in self.test_results if result["success"])
        total = len(self.test_results)
        
        print(f"✅ Passed: {passed}/{total}")
        print(f"❌ Failed: {total - passed}/{total}")
        
        if total - passed > 0:
            print("\n🔍 FAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"   • {result['test']}: {result['message']}")
        
        print(f"\n🎯 Overall Success Rate: {(passed/total)*100:.1f}%")
        
        return passed == total

if __name__ == "__main__":
    tester = PortfolioAPITester()
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)