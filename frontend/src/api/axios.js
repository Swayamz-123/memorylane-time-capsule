import axios from 'axios';

// Vite exposes env vars on import.meta.env and requires VITE_ prefix for user vars
const baseURL = import.meta?.env?.VITE_BASE_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL,
  withCredentials: true, // send cookies by default
});

export default api;
