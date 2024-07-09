import axios from 'axios';

const ROOT_API = 'http://localhost:3001/coins'
console.log(ROOT_API)
const axiosClient = axios.create({
  baseURL: ROOT_API,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 50000,
});

export default axiosClient;
