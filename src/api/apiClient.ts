import axios, { AxiosInstance } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important to send/receive cookies
});

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
