import axios from 'axios';

const variable = process.env.REACT_APP_MY_ENV_VAL

console.log("API Base URL:", process.env.REACT_APP_BASE_URL);

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:5000', // Default to localhost for development
});

export default apiClient;