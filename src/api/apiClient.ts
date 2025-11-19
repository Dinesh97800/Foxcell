import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie'; // Install with: npm install js-cookie

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// ✅ Request interceptor to attach token from cookies
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token'); // the cookie name your backend sets (e.g. 'token')
    console.log(token);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log('Unauthorized - user not logged in');
    }
    return Promise.reject(error);
  }
);

export default api;
