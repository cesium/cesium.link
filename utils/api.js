import axios from 'axios';

let APP_URL = process.env.NEXT_PUBLIC_APP_URL;

if (!/^https?:\/\//i.test(APP_URL)) {
  APP_URL = 'http://' + APP_URL;
}

const API = axios.create({
  baseURL: `${APP_URL}/api`,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default API;
