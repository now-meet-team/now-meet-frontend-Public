import {GoogleSignin} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import {
  removeUserSession,
  retrieveUserSession,
  storeUserSession,
} from 'utils/auth';

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

      console.log('status-->', status);

      if (error.response && status === 401) {
        try {
          const userInfo = await GoogleSignin.signInSilently();

          const oldInfo = await GoogleSignin.getCurrentUser();

          if (oldInfo) {
            const oldTokens = await GoogleSignin.getTokens();
            await GoogleSignin.clearCachedAccessToken(oldTokens.idToken);
          }

          config.headers.Authorization = `Bearer ${userInfo.idToken}`;
          await storeUserSession('idToken', `${userInfo.idToken}`);

          return axios(originalRequest);
        } catch (err) {
          console.log('err-->', err);
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
