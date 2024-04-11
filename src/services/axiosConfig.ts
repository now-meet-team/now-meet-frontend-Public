import {GoogleSignin} from '@react-native-google-signin/google-signin';
import axios from 'axios';

import {
  removeUserSession,
  retrieveUserSession,
  storeUserSession,
} from 'utils/auth';
import * as RootNavigation from '../utils/navigate/RootNavigation';
import {navigationRef} from '../utils/navigate/RootNavigation';

export const createApi = () => {
  const axiosInstance = axios.create({
    baseURL: 'https://nowmeet.org',
  });

  axiosInstance.interceptors.request.use(
    async config => {
      try {
        const token = await retrieveUserSession('idToken');

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
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
          const oldInfo = await GoogleSignin.getCurrentUser();
          console.log(oldInfo);

          if (oldInfo) {
            const oldTokens = await GoogleSignin.getTokens();
            await GoogleSignin.clearCachedAccessToken(oldTokens.idToken);
          }

          const userInfo = await GoogleSignin.signInSilently();

          config.headers.Authorization = `Bearer ${userInfo.idToken}`;
          await storeUserSession('idToken', `${userInfo.idToken}`);

          return axios(originalRequest);
        } catch (err) {
          console.log('err-->', err);
          console.log('에러인데?');
          RootNavigation.navigationRef.current?.navigate('Home');

          await removeUserSession('idToken');
          await GoogleSignin.signOut();

          throw err;
        }
      }

      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

const axiosInstance = createApi();

export default axiosInstance;
