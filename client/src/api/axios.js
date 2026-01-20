import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true
});

let isRefreshing = false;
let queue = [];

const processQueue = (error) => {
  queue.forEach(p => error ? p.reject(error) : p.resolve());
  queue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({ resolve, reject });
      }).then(() => api(originalRequest));
    }

    isRefreshing = true;

    try {
      await api.post('/auth/refresh');
      processQueue(null);
      return api(originalRequest);
    } catch (err) {
      processQueue(err);
      logout(); // FORCE logout
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
