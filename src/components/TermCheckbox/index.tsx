import {DisabledTerms, Terms} from '../../assets/index';
import React from 'react';

import styled from 'styled-components/native';

type TermCheckboxType = {
  isCheck?: boolean;
  handleCheck: () => void;
};

export default function TermCheckbox(props: TermCheckboxType) {
  const {isCheck, handleCheck} = props;
  return (
    <StyledSvgContainer onPress={handleCheck}>
      {isCheck ? <Terms /> : <DisabledTerms />}
    </StyledSvgContainer>
  );
}

export const StyledSvgContainer = styled.TouchableOpacity`
  position: relative;
  bottom: 5px;
`;
