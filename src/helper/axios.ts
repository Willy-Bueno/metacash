import axios from 'axios';

const instance = axios.create({
  baseURL: `https://metacash.vercel.app/api`,
  headers: {
    'Content-Type': 'multipart/form-data',
  }
})

export default instance;