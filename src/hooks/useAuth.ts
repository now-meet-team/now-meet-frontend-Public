import React, {useState, useEffect} from 'react';
import {retrieveUserSession} from 'utils/auth';

const useAuth = () => {
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
