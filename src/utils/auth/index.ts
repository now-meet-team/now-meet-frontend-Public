import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {webClientId} from 'config/env';

import {axiosInstance} from 'lib/axiosConfig';
import EncryptedStorage from 'react-native-encrypted-storage';
import Keychain from 'react-native-keychain';

export const setAuthToken = (authToken: string | null) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${authToken}`;
};

export const saveWebClientId = async () => {
  try {
    const key = await Keychain.setGenericPassword(
      webClientId,
      'your_encrypted_webClientId',
    );

    if (key) {
      retrieveWebClientId();
    }
  } catch (error) {
    console.error('Error saving:', error);
  }
};

export const retrieveWebClientId = async () => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      const decryptedWebClientId = credentials.username;

      GoogleSignin.configure({
        webClientId: decryptedWebClientId,
      });
    } else {
      console.log('No webClientId found.');
    }
  } catch (error) {
    console.error('Error retrieving webClientId:', error);
  }
};

export const storeUserSession = async (key: string, value: string) => {
  try {
    await EncryptedStorage.setItem(key, value);

    // Congrats! You've just stored your first value!
  } catch (error) {
    // There was an error on the native side
  }
};

export const retrieveUserSession = async (key: string) => {
  try {
    const session = await EncryptedStorage.getItem(key);

    if (session !== undefined) {
      console.log('Congrats! You just retrieved your first value!');
    }
  } catch (error) {
    // There was an error on the native side
  }
};
