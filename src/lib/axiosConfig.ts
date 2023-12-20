import {GoogleSignin} from '@react-native-google-signin/google-signin';

import axios from 'axios';
import {retrieveUserSession, storeUserSession} from 'utils/auth';

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

    const originalRequest = error.config;

    if (error.response && status === 401) {
      try {
        const userInfo = await GoogleSignin.signInSilently();

        config.headers.Authorization = `Bearer ${userInfo.idToken}`;
        await storeUserSession('idToken', `${userInfo.idToken}`);

        return axios(originalRequest);
      } catch (err) {
        throw err;
      }
    }

    return Promise.reject(error);
  },
);
