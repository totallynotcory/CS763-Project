import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:5000', // Base URL for API requests, update when deploying
})

export default apiClient