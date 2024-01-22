import {StyleSheet, Text, View} from 'react-native';
import React, {ReactNode} from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {palette} from 'config/globalStyles';

type UserChipType = {
  width: string;
  height: string;
  text: string;
  disabled?: boolean;
  svg?: ReactNode;
  onPress: () => void;
};

export default function UserChip(props: UserChipType) {
  const {width, height, disabled = false, text, svg, onPress, ...other} = props;
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <MainWrapper width={width} height={height} {...other}>
        {svg && <View>{svg}</View>}
        <StyledText>{text}</StyledText>
      </MainWrapper>
    </TouchableOpacity>
  );
}

export const MainWrapper = styled.View<{width: string; height: string}>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border: 1px solid #000;

  display: flex;
  flex-direction: row;
  gap: 17px;
  justify-content: center;
  align-items: center;

  border-radius: 8px;
`;

export const StyledText = styled.Text`
  font-size: 15px;
  font-weight: 600;
`;
