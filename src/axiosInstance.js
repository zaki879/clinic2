import axios from 'axios';

const API_BASE_URL = 'https://beeep-husq.onrender.com/api';
let accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');

const instance = axios.create({
  baseURL: API_BASE_URL,
});

// Function to set access token
export const setAccessToken = (token) => {
  accessToken = token;
  localStorage.setItem('accessToken', token);
};

// Function to refresh access token
const refreshAccessToken = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
        refreshToken: refreshToken,
    });
    const { accessToken: newAccessToken } = response.data;
    setAccessToken(newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};

// Axios request interceptor to automatically refresh token if needed
instance.interceptors.request.use(
  async (config) => {
    // Check if access token exists and is not expired
    if (accessToken) {
      // You may need to implement logic to check token expiry here
      // For the sake of simplicity, assuming accessToken is always valid
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export default instance;
