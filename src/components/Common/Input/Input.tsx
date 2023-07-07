import styled from 'styled-components/native';
import {palette} from '../../../config/globalStyles';

type InputType = {
  onChangeText: ((text: string) => void) | undefined;
  value: string;
  placeholder?: string;
};

export default function Input(props: InputType) {
  const {value, onChangeText, ...other} = props;
  return <StyledInput onChangeText={onChangeText} value={value} {...other} />;
}

const StyledInput = styled.TextInput`
  height: 40px;
  margin: 12px;
  padding: 10px;
  border-width: 1px;
  border-radius: 30px;
  border-color: ${palette.inputColor};
`;
