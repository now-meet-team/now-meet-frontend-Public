import React from 'react';

import styled from 'styled-components/native';
import {palette} from 'config/globalStyles';

import AppleSigninButton from 'components/Common/Button/AppleSigninButton/AppleSigninButton';
import GoogleLoginButton from 'components/Common/Button/GoogleLoginButton/GoogleLoginButton';

export default function Home() {
  return (
    <HomeContainer>
      <ButtonContainer>
        <AppleSigninButton />
        <GoogleLoginButton />
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
