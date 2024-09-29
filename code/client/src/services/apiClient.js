import axios from 'axios'
const dotenv = require('dotenv');

const apiClient = axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:5000', // Base URL for API requests, update with environemnt variable for deployment
})

export default apiClient