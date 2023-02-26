import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {palette} from '../../config/globalStyles';
import Button from '../../components/Common/Button/Button';
import styled from 'styled-components/native';

type SignUpLayoutType = {
  title: string;
  children?: React.ReactNode;
};

export default function SignUpLayout(props: SignUpLayoutType) {
  const {title, children} = props;
  return (
    <SignUpLayoutContainer>
      <SignUpText>{title}</SignUpText>

      <View>{children}</View>

      <ButtonContainer>
        <Button
          backgroundColor={palette.awesome}
          title="다음"
          onPress={() => {}}
        />
      </ButtonContainer>
    </SignUpLayoutContainer>
  );
}

const SignUpLayoutContainer = styled.SafeAreaView`
  flex: 1;
  position: relative;
  background-color: ${palette.white};
`;

const SignUpText = styled.Text`
  font-size: 24px;
  font-weight: 500;
  padding: 20px;
  background-color: ${palette.white};
`;

const ButtonContainer = styled.View`
  width: 100%;
  position: absolute;
  bottom: 20px;
  padding: 15px;
`;
