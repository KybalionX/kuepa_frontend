import axios from 'axios';
import { LOCALSTORAGE_USER_TOKEN } from '../utils/constants.utils';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000,
  headers: {
    authorization: window.localStorage.getItem(LOCALSTORAGE_USER_TOKEN)
  }
});

axiosInstance.interceptors.request.use(function (config) {
  const token = window.localStorage.getItem(LOCALSTORAGE_USER_TOKEN);
  config.headers.Authorization = token || '';
  return config;
});

export default axiosInstance;
