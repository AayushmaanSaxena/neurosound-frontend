import axios from 'axios';

// Base URL of your backend
// All requests will start with this
const BASE_URL = 'http://localhost:3000/api';

// Create an axios instance with default config
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // Sends cookies automatically (for refresh token)
});

// ─────────────────────────────────────────
// REQUEST INTERCEPTOR
// Runs before every request is sent
// Automatically adds the access token to every request
// So you don't have to manually add it every time
// ─────────────────────────────────────────
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ─────────────────────────────────────────
// RESPONSE INTERCEPTOR
// Runs after every response comes back
// If we get a 401 (token expired) → automatically refresh the token
// Then retry the original request
// This is how apps keep you logged in without asking for password
// ─────────────────────────────────────────
api.interceptors.response.use(
    (response) => response, // if successful, just return the response
    async (error) => {
        const originalRequest = error.config;


        // Skip refresh logic for auth endpoints
        // Login/register failures should just throw the error
        const isAuthRoute = originalRequest.url?.includes('/auth/')

        // If 401 and we haven't already tried to refresh
        if (error.response?.status === 401 && !originalRequest._retry && !isAuthRoute) {
            originalRequest._retry = true;

            try {
                // Try to get a new access token
                const response = await axios.post(
                    `${BASE_URL}/auth/refresh`,
                    {},
                    { withCredentials: true }
                );

                const newToken = response.data.accessToken;
                localStorage.setItem('accessToken', newToken);

                // Retry the original request with new token
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);

            } catch (refreshError) {
                // Refresh failed — user needs to log in again
                localStorage.removeItem('accessToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;