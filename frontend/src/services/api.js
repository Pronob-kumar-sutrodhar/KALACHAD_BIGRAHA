import axios from 'axios'

// Base URL resolution:
// 1. In production (Netlify), API requests must use relative paths ('') so Netlify's redirects
//    proxy them directly to /.netlify/functions/api/:splat without CORS or broken localhost references.
// 2. Ignore any accidental 'localhost' in production environment variables.
// 3. In local dev (vite dev), default to http://localhost:5000.
const getBaseURL = () => {
  const envUrl = import.meta.env.VITE_API_URL
  if (import.meta.env.PROD) {
    if (envUrl && !envUrl.includes('localhost') && !envUrl.includes('127.0.0.1')) {
      return envUrl
    }
    return ''
  }
  return envUrl || 'http://localhost:5000'
}

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to attach JWT token from localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect on 401 if not already on login
    if (error.response?.status === 401 && !window.location.pathname.includes('/login')) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
    return Promise.reject(error)
  }
)

export default api
