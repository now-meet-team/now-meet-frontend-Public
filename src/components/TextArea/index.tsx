import React from 'react';
import styled from 'styled-components/native';
import {palette} from 'config/globalStyles';

type TextAreaType = {
  value: string;
  onChangeText: (value: string) => void;
};

export default function TextArea(props: TextAreaType) {
  return (
    <StyledContainer>
      <StyledTextInput
        placeholder={'자신을 자유롭게 나타내주세요 :) (최대 200자)'}
        numberOfLines={8}
        maxLength={200}
        multiline={true}
        value={props.value}
        onChangeText={text => props.onChangeText(text)}
      />
    </StyledContainer>
  );
}

const StyledContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTextInput = styled.TextInput`
  border: 1px solid ${palette.inputColor};
  width: 345px;

  max-height: 240px;

  border-radius: 8px;

  padding: 10px 20px;
  font-size: 16px;
`;
