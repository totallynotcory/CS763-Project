import axios from 'axios'

// const apiClient = axios.create({
//   baseURL: process.env.BASE_URL || 'http://localhost:5000', // Base URL for API requests, update with environemnt variable for deployment
// })

const apiClient = axios.create({
  baseURL: 'https://peak-performance-3c40e2c0ebea.herokuapp.com/', // Base URL for API requests, update with environemnt variable for deployment
})

export default apiClient