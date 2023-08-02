import {View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import {palette} from 'config/globalStyles';

export type TermTextBoxType = {
  lineText: string;
  requiredText: string;
  isBorder?: boolean | undefined;
};

export default function TermTextBox(props: TermTextBoxType) {
  const {lineText, requiredText, isBorder = true} = props;
  return (
    <StyledLineTextContainer isBorder={isBorder}>
      <StyledTermText>
        <StyledTermsText>{lineText}</StyledTermsText>
        <StyledRequiredText>{requiredText}</StyledRequiredText>
      </StyledTermText>
    </StyledLineTextContainer>
  );
}

const StyledLineTextContainer = styled(View)<{isBorder: boolean}>`
  border-bottom-width: ${props => (props.isBorder ? '1px' : '0px')};
  border-color: ${palette.lineColor};
  border-style: solid;

  font-size: 14px;
  margin-top: 14px;
`;

export const StyledTermText = styled.View`
  margin-bottom: 14px;
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

export const StyledTermsText = styled.Text`
  text-decoration-line: underline;
  text-decoration-color: ${palette.nero};
`;

export const StyledRequiredText = styled.Text`
  color: ${palette.requiredText};
`;
