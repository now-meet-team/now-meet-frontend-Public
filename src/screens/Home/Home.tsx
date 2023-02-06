import {View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';

export default function Home() {
  return (
    <View>
      <Title>Home..</Title>
    </View>
  );
}

const Title = styled.Text`
  font-size: 20px;
  text-align: center;
  color: palevioletred;
`;
