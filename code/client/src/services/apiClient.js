import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || 'http://localhost:5000', // Default to localhost for development environment
});

export default apiClient;