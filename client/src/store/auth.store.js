let accessToken = localStorage.getItem('accessToken');

export const setToken = (token) => {
  accessToken = token;
  localStorage.setItem('accessToken', token);
};


export const clearToken = () => {
  accessToken = null;
  localStorage.removeItem('accessToken');
};

export const getToken = () => accessToken;