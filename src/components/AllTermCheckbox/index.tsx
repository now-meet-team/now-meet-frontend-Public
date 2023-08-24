import {View, Text} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import {palette} from 'config/globalStyles';
import TermCheckbox from 'components/TermCheckbox';

export type AllTermCheckboxType = {
  label: string;
  isCheck?: boolean;
  handleCheck: () => void;
};

export default function AllTermCheckbox(props: AllTermCheckboxType) {
  const {label, isCheck, handleCheck} = props;
  return (
    <StyledLineTextContainer>
      <Text>{label}</Text>

      <AllCheckboxContainer>
        <TermCheckbox isCheck={isCheck} handleCheck={handleCheck} />
      </AllCheckboxContainer>
    </StyledLineTextContainer>
  );
}

const StyledLineTextContainer = styled(View)<{isBorder?: boolean}>`
  border-bottom-width: ${props => (props.isBorder ? '1px' : '0px')};
  border-color: ${palette.lineColor};
  border-style: solid;

  font-size: 14px;
  margin-top: 14px;

  background-color: ${palette.lineColor};

  width: 100%;
  height: 52px;

  border-radius: 6px;

  padding: 18px 10px;
`;

const AllCheckboxContainer = styled.View`
  position: relative;
  bottom: 10px;

  display: flex;
  justify-content: center;
  align-items: flex-end;
`;
