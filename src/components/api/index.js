import axios from 'axios';
import { Encrypt } from '../crypto';

axios.defaults.paramsSerializer = function (paramObj) {
  const params = new URLSearchParams();
  for (const key in paramObj) {
    const param = Encrypt(paramObj[key]);
    params.append(key, encodeURIComponent(param));
  }
  return params.toString();
};

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001',
  timeout: 3000,
  crossDomain: true,
  changeOrigin: true,
  withCredentials: true,
  credentials: 'same-origin',
  responseType: 'json',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
  },
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
