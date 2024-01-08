import React from 'react';
import styled from 'styled-components/native';
import {palette} from '../../../config/globalStyles';

type InputType = {
  onChangeText: ((text: string) => void) | undefined;
  value: string;
  placeholder?: string;
  maxLength?: number;
};

export default function Input(props: InputType) {
  const {value, onChangeText, maxLength, ...other} = props;
  return (
    <StyledInput
      onChangeText={onChangeText}
      value={value}
      maxLength={maxLength}
      {...other}
    />
  );
}

const StyledInput = styled.TextInput`
  height: 40px;
  margin: 12px;
  padding: 10px;

  border-bottom-width: 1px;
  border-color: ${palette.inputColor};

  font-size: 18px;
`;
