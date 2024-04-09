import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from 'navigation/Routes';
import React, {useState, useEffect} from 'react';
import {retrieveUserSession} from 'utils/auth';

const useAuth = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getIsSignedIn = async () => {
    try {
      const getToken = await retrieveUserSession('idToken');

      if (getToken) {
        setUserToken(getToken);
      }
    } catch (error) {
      console.error('자동 로그인 오류:', error);
      navigation.navigate('Home');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getIsSignedIn();
  }, []);

  return {userToken, loading};
};

export default useAuth;
