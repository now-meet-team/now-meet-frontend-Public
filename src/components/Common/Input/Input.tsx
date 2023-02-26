import styled from 'styled-components/native';
import {palette} from '../../../config/globalStyles';

type InputType = {
  placeholder?: string;
};

export default function Input(props: InputType) {
  return <StyledInput {...props} />;
}

const StyledInput = styled.TextInput`
  height: 40px;
  margin: 12px;
  padding: 10px;
  border-width: 1px;
  border-radius: 30px;
  border-color: ${palette.inputColor};
`;
