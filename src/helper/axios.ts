import axios from 'axios';

const instnce = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'multipart/form-data',
  }
})

export default instnce;