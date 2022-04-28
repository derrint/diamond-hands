/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import {Config} from '@constant/';

const http = axios.create({
  baseURL: Config.apiURL,
});

http.interceptors.request.use(
  async (config) => {
    const JWT_TOKEN = localStorage.getItem('JWT_TOKEN');
    if (JWT_TOKEN != null) {
      config.headers.Authorization = `Bearer ${JWT_TOKEN}`;
    }
    return config;
  },
  (error) => {
    console.warn('error');
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      typeof error.response !== 'undefined'
      && error.response.status === 500
    ) {
      if (typeof error.response !== 'object') {
        if (
          error.response.data.indexOf('Mod jwt error:Token error:') > -1
          || error.response.data.indexOf(
            'Mod jwt error:unable to get session: Session not found',
          ) > -1
          || error.response.data.indexOf('Session ') > -1
          || error.response.data.indexOf('token') > -1
          || error.response.data.indexOf('not allowed') > -1
        ) {
          localStorage.removeItem('JWT_TOKEN').then(() => {
            console.log('TOKEN CLEARED');
          });
        }
      }
    }
    return Promise.reject(error);
  },
);

export default http;
