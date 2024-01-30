import React, {useEffect} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {usePostIsSignIn} from 'lib/mutation/auth';

import {saveWebClientId, storeUserSession} from 'utils/auth';

export default function GoogleLoginButton() {
  const {useSignInMutation} = usePostIsSignIn();

  useEffect(() => {
    saveWebClientId();
  }, []);

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      const userInfo = await GoogleSignin.signIn();
      await storeUserSession('idToken', `${userInfo.idToken}`);

      useSignInMutation.mutate(userInfo?.user.email);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={googleLogin}
      disabled={false}
    />
  );
}
