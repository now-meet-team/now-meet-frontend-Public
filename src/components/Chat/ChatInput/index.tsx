import React, {memo} from 'react';
import styled from 'styled-components/native';

import {EditSVG} from 'assets';

import {GestureResponderEvent} from 'react-native';
import {InputSvgContainer} from '../MessageList';

type InputType = {
  onChangeText: (text: string) => void;
  onSubmit: (event: GestureResponderEvent) => void;
  value: string;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
};

function ChatInput(props: InputType) {
  const {value, onChangeText, onSubmit, disabled, ...other} = props;

  return (
    <MessageTextInputContainer>
      <MessageTextInput
        value={value}
        placeholder="메세지를 입력해주세요"
        onChangeText={text => onChangeText(text)}
        {...other}
      />

      <InputSvgContainer disabled={disabled} onPress={onSubmit}>
        <EditSVG width={20} height={20} />
      </InputSvgContainer>
    </MessageTextInputContainer>
  );
}

export default memo(ChatInput);

export const MessageTextInputContainer = styled.View`
  margin-top: auto;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const MessageTextInput = styled.TextInput`
  width: 90%;
  height: 40px;
  align-self: center;

  border-width: 1px;
  border-radius: 10px;

  padding-left: 15px;
  padding-right: 35px;
`;
