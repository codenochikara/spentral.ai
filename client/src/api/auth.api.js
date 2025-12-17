import api from './axios';

export const loginUser = (payload) => api.post('/auth/login', payload);
export const signupUser = (payload) => api.post('/api/users', payload);
export const logoutUser = () => api.post('/auth/logout');