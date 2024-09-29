import axios from 'axios';

console.log("API Base URL:", process.env.REACT_APP_BASE_URL);

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:5000', // Default to localhost for development environment
});

export default apiClient;