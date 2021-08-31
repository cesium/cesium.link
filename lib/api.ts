import axios from 'redaxios';

const API = axios.create({
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default API;
