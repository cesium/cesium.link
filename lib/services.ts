import { ApiService } from '~/services/ApiService';

export let APP_URL = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_VERCEL_URL;

if (!/^https?:\/\//i.test(APP_URL)) {
  APP_URL = 'http://' + APP_URL;
}

export const API = new ApiService(APP_URL);
