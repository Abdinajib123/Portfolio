import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials: { email: string; password: string }) => api.post('/auth/login', credentials),
  register: (userData: { username: string; email: string; password: string; role?: string }) => api.post('/auth/register', userData),
  getProfile: () => api.get('/auth/me'),
  updateProfile: (userData: { username: string; email: string }) => api.put('/auth/profile', userData),
};

// Projects API
export const projectsAPI = {
  getAll: (params: any = {}) => api.get('/projects', { params }),
  getById: (id: string) => api.get(`/projects/${id}`),
  create: (projectData: any) => api.post('/projects', projectData),
  update: (id: string, projectData: any) => api.put(`/projects/${id}`, projectData),
  delete: (id: string) => api.delete(`/projects/${id}`),
  toggleFeatured: (id: string) => api.put(`/projects/${id}/toggle-featured`),
  reorder: (projects: any[]) => api.put('/projects/reorder', { projects }),
};

// Skills API
export const skillsAPI = {
  getAll: (params: any = {}) => api.get('/skills', { params }),
  getCategories: () => api.get('/skills/categories'),
  getById: (id: string) => api.get(`/skills/${id}`),
  create: (skillData: any) => api.post('/skills', skillData),
  update: (id: string, skillData: any) => api.put(`/skills/${id}`, skillData),
  delete: (id: string) => api.delete(`/skills/${id}`),
  reorder: (skills: any[]) => api.put('/skills/reorder', { skills }),
  bulkCreate: (skills: any[]) => api.post('/skills/bulk', { skills }),
};

// Upload API
export const uploadAPI = {
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    return api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  uploadMultiple: (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });
    return api.post('/upload/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default api;
