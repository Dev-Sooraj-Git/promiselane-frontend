import axios from 'axios';

const api = axios.create({
    // baseURL: 'http://127.0.0.1:8000/api/v1',
    baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle 401 responses globally
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    const isShareRoute = config.url.includes('/share/');
    if (token && !isShareRoute) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
