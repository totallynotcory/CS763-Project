import axios from 'axios'
const dotenv = require('dotenv');
const path = require('path')

// Determine the correct .env file based on the environment
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';

// Load the appropriate .env file
// dotenv.config({ path: `../${envFile}` }); 
dotenv.config({ path: path.resolve(__dirname, `../../../${envFile}`) })

const apiClient = axios.create({
  baseURL: process.env.BASE_URL || 'http://localhost:5000', // Base URL for API requests, update with environemnt variable for deployment
})

export default apiClient