import axios from 'axios';
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const api = axios.create({
    baseURL: isLocal
        ? 'http://127.0.0.1:8000/api/v1'
        : import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    const isShareRoute = config.url.includes('/share/');
    if (token && !isShareRoute) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
