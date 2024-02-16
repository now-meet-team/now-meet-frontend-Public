import {Text} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

export default function NetworkError() {
  return (
    <NetworkContainer>
      <Text>인터넷이 연결되어 있지 않습니다.</Text>
    </NetworkContainer>
  );
}

export const NetworkContainer = styled.View`
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;
`;
