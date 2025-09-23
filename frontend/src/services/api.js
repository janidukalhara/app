import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
const API = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

const API_BASE = "http://localhost:8001/api"; // make sure this matches your backend

export const contactService = {
  submitContactForm: async (formData) => {
    try {
      const response = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Try to parse error message from backend
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "Failed to send message");
      }

      const data = await response.json();
      return data; // this will contain { success, message, id }
    } catch (error) {
      console.error("ContactService Error:", error);
      throw error; // will be caught in your handleSubmit
    }
  },
};

// Blog Service
export const blogService = {
  async getBlogPosts(params = {}) {
    try {
      const { category, page = 1, per_page = 10 } = params;
      const queryParams = new URLSearchParams({
        page: page.toString(),
        per_page: per_page.toString()
      });
      
      if (category && category !== 'All') {
        queryParams.append('category', category);
      }
      
      const response = await apiClient.get(`/blog?${queryParams}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch blog posts');
    }
  },

  async getBlogPost(postId) {
    try {
      const response = await apiClient.get(`/blog/${postId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch blog post');
    }
  },

  async createBlogPost(postData) {
    try {
      const response = await apiClient.post('/blog', postData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to create blog post');
    }
  }
};

// Testimonials Service
export const testimonialService = {
  async getTestimonials() {
    try {
      const response = await apiClient.get('/testimonials');
      return response.data.testimonials;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch testimonials');
    }
  },

  async submitTestimonial(testimonialData) {
    try {
      const response = await apiClient.post('/testimonials', testimonialData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to submit testimonial');
    }
  }
};

// Projects Service
export const projectService = {
  async getProjects(params = {}) {
    try {
      const { category, featured } = params;
      const queryParams = new URLSearchParams();
      
      if (category && category !== 'All') {
        queryParams.append('category', category);
      }
      
      if (featured !== undefined) {
        queryParams.append('featured', featured.toString());
      }
      
      const url = queryParams.toString() ? `/projects?${queryParams}` : '/projects';
      const response = await apiClient.get(url);
      return response.data.projects;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch projects');
    }
  },

  async createProject(projectData) {
    try {
      const response = await apiClient.post('/projects', projectData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to create project');
    }
  }
};

// Health check
export const healthService = {
  async checkHealth() {
    try {
      const response = await apiClient.get('/');
      return response.data;
    } catch (error) {
      throw new Error('Backend service unavailable');
    }
  }
};



export default apiClient;