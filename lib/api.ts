import axios from 'redaxios';

import { getUrl } from './config';

export let APP_URL = getUrl();

if (!/^https?:\/\//i.test(APP_URL)) {
  APP_URL = 'http://' + APP_URL;
}

const API = axios.create({
  baseURL: `${APP_URL}`,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default API;
