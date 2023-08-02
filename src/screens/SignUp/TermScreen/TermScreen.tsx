import React from 'react';
import SignUpLayout from '@layout/SignUpLayout/SignUpLayout';
import TermTextBox from 'components/TermTextBox';
import {StyledChipContainer} from '../GenderScreen/GenderScreen';
import styled from 'styled-components/native';

export default function TermScreen() {
  return (
    <SignUpLayout title={'이용약관에 동의해주세요'}>
      <StyledTermTextContainer>
        <TermTextBox lineText="이용약관 동의" requiredText="필수" />
        <TermTextBox
          lineText="개인정보 수집 및 이용 동의"
          requiredText="필수"
        />
        <TermTextBox lineText="위치정보 이용약관 동의" requiredText="필수" />
        <TermTextBox lineText="민감정보 이용 동의" requiredText="필수" />
        <TermTextBox
          lineText="마케팅 수신 동의"
          requiredText="선택"
          isBorder={false}
        />
      </StyledTermTextContainer>
    </SignUpLayout>
  );
}

const StyledTermTextContainer = styled(StyledChipContainer)`
  display: flex;
  flex-direction: column;
`;
