// api.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config'; // For environment variables

// Create an axios instance
const api = axios.create({
  //baseURL: Config.API_BASE_URL,
  baseURL: "https://api.coingecko.com/api/v3/simple/price?ids=",
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling errors and token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        const response = await axios.post(`${Config.API_BASE_URL}/refresh-token`, { refreshToken });
        const { token } = response.data;
        await AsyncStorage.setItem('authToken', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Handle refresh token error (e.g., logout user)
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Generic GET request
export const get = async (url, params = {}) => {
  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// Generic POST request
export const post = async (url, data = {}) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// Generic PUT request
export const put = async (url, data = {}) => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// Generic DELETE request
export const del = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// Error handling function
const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('Data:', error.response.data);
    console.error('Status:', error.response.status);
    console.error('Headers:', error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Request:', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error:', error.message);
  }
  console.error('Config:', error.config);
};

// Cache management
const cache = new Map();

export const getCached = async (url, params = {}, ttl = 60000) => {
  const cacheKey = `${url}${JSON.stringify(params)}`;
  const cachedData = cache.get(cacheKey);
  if (cachedData && Date.now() - cachedData.timestamp < ttl) {
    return cachedData.data;
  }
  const data = await get(url, params);
  cache.set(cacheKey, { data, timestamp: Date.now() });
  return data;
};

// Request cancellation
export const cancelableGet = (url, params = {}) => {
  const source = axios.CancelToken.source();
  const promise = get(url, { ...params, cancelToken: source.token });
  return { promise, cancel: () => source.cancel('Request canceled by user') };
};

export default {
  get,
  post,
  put,
  del,
  getCached,
  cancelableGet,
};