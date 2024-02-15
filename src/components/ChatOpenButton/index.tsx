import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import {palette} from 'config/globalStyles';

type ChatOpenButtonType = {
  onPress: () => void;
};

export default function ChatOpenButton(props: ChatOpenButtonType) {
  const {onPress} = props;
  return (
    <OpenButton onPress={onPress}>
      <OpenText size="13px" weight={400}>
        잼 100개
      </OpenText>
      <OpenText size="18px" weight={700}>
        대화 시작하기
      </OpenText>
    </OpenButton>
  );
}

export const OpenButton = styled.TouchableOpacity`
  position: absolute;
  justify-content: center;
  align-self: center;
  bottom: 50%;

  width: 168px;
  height: 80px;

  border-radius: 5px;

  background-color: ${palette.buttonColor};
`;

export const OpenText = styled.Text<{size: string; weight: number}>`
  display: flex;
  align-self: center;
  color: ${palette.white};

  font-size: ${props => props.size};
  line-height: 24px;
  font-weight: ${props => props.weight};
`;
