import React from 'react';
import {TouchableOpacityProps, TextProps} from 'react-native';
import styled from 'styled-components/native';

type ButtonProps = TouchableOpacityProps &
  StyledButtonType &
  StyledTextType & {
    title: string;
    onPress: () => void;
  };

const Button = ({title, onPress, ...rest}: ButtonProps) => {
  return (
    <StyledButton {...rest} onPress={onPress}>
      <ButtonText color={rest.color}>{title}</ButtonText>
    </StyledButton>
  );
};

export default Button;

type StyledButtonType = TouchableOpacityProps & {
  backgroundColor?: string;
  padding?: string;
  borderRadius?: number;
};

type StyledTextType = TextProps & {
  color?: string;
  fontSize?: number;
  textAlign?: string;
};

const StyledButton = styled.TouchableOpacity<StyledButtonType>`
  background-color: ${props => props.backgroundColor || '#007AFF'};
  padding: ${props => props.padding || '0px'};
  border-radius: ${props => props.borderRadius || 30}px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text<StyledTextType>`
  color: ${props => props.color || '#fff'};
  font-size: ${props => props.fontSize || 16}px;
  text-align: ${props => props.textAlign || 'center'};
`;
