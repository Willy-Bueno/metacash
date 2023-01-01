import axios from 'axios';

const instance = axios.create({
  baseURL: `http://${process.env.WEB_URL || "localhost:3000"}/api`,
  headers: {
    'Content-Type': 'multipart/form-data',
  }
})

export default instance;