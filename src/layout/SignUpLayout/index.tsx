import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {palette} from '../../config/globalStyles';
import Button from '../../components/Button/Button';
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

      {children}

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

const SignUpLayoutContainer = styled.View`
  position: relative;
  height: 100%;
`;

const SignUpText = styled.Text`
  font-size: 24px;
  font-weight: 500;

  background-color: red;
`;

const ButtonContainer = styled.View`
  width: 100%;
  position: absolute;
  bottom: 0;
  padding: 15px;
`;
