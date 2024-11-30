import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Base URL for all backend API calls
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
