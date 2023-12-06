import React, {useEffect} from 'react';

import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {useEmailStore} from 'store/signup/signUpStore';

import styled from 'styled-components/native';
import {palette} from 'config/globalStyles';

import {saveWebClientId} from 'utils/auth';
import {useGetRefreshToken, usePostIsSignIn} from 'lib/mutation/auth';

export default function Home() {
  const handleEmail = useEmailStore(state => state.handleEmail);
  const {useSignInMutation} = usePostIsSignIn();
  const {useGetRefreshTokenMutation} = useGetRefreshToken();

  useEffect(() => {
    saveWebClientId();
  }, []);

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

      const userInfo = await GoogleSignin.signIn();
      useGetRefreshTokenMutation.mutate(userInfo?.serverAuthCode || '');

      console.log(userInfo.idToken);
      handleEmail(userInfo?.user.email);
      useSignInMutation.mutate(userInfo?.user.email);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <HomeContainer>
      <ButtonContainer>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={googleLogin}
          disabled={false}
        />
      </ButtonContainer>
    </HomeContainer>
  );
}

const HomeContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${palette.white};
`;

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 80px;
  left: 10%;
`;
