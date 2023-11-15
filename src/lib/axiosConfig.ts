import axios from 'axios';
import {retrieveUserSession} from 'utils/auth';

export const axiosInstance = axios.create({
  baseURL: 'https://nowmeet.org',
});

axiosInstance.interceptors.request.use(
  async config => {
    try {
      const token = await retrieveUserSession('token');
      console.log(token);

      if (token) {
        config.headers.Authorization = token;
      }
    } catch (error) {
      console.error('토큰을 가져오는 동안 오류 발생:', error);
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
