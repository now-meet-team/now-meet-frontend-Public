import axios from 'axios';
import {retrieveUserSession} from 'utils/auth';
import {useGetRefreshToken} from './mutation/auth';

export const axiosInstance = axios.create({
  baseURL: 'https://nowmeet.org',
});

axiosInstance.interceptors.request.use(
  async config => {
    try {
      const token = await retrieveUserSession('idToken');

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

axiosInstance.interceptors.response.use(
  async config => {
    return config;
  },
  async error => {
    const {
      config,
      response: {status},
    } = error;

    if (status === 401) {
      const refreshToken = await retrieveUserSession('idToken');
      config.headers.authorization = `Bearer ${refreshToken}`;
    }

    console.log('response error', error);
    return Promise.reject(error);
  },
);
