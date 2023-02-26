import styled from 'styled-components/native';
import {palette} from '../../../config/globalStyles';

type InputType = {
  value: string;
  placeholder?: string;
};

export default function Input(props: InputType) {
  const {value, ...other} = props;
  return <StyledInput value={value} {...other} />;
}

const StyledInput = styled.TextInput`
  height: 40px;
  margin: 12px;
  padding: 10px;
  border-width: 1px;
  border-radius: 30px;
  border-color: ${palette.inputColor};
`;
