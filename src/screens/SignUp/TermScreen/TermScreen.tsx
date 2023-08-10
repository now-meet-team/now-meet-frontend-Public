import React from 'react';
import SignUpLayout from '@layout/SignUpLayout/SignUpLayout';
import TermTextBox from 'components/TermTextBox';
import {StyledChipContainer} from '../GenderScreen/GenderScreen';
import styled from 'styled-components/native';
import {useTermsStore} from 'store/term/termStore';
import {shallow} from 'zustand/shallow';

export default function TermScreen() {
  const termCheckValue = useTermsStore(
    state => ({
      term: state.term,
      privacy: state.privacy,
      locationCheck: state.locationCheck,
      sensitiveCheck: state.sensitiveCheck,
      marketingCheck: state.marketingCheck,
    }),
    shallow,
  );

  return (
    <SignUpLayout title={'이용약관에 동의해주세요'}>
      <StyledTermTextContainer>
        <TermTextBox
          isCheck={termCheckValue.term}
          handleCheck={() => {
            useTermsStore.setState({term: !termCheckValue.term});
          }}
          lineText="이용약관 동의"
          requiredText="필수"
        />

        <TermTextBox
          isCheck={termCheckValue.privacy}
          handleCheck={() => {
            useTermsStore.setState({privacy: !termCheckValue.privacy});
          }}
          lineText="개인정보 수집 및 이용 동의"
          requiredText="필수"
        />

        <TermTextBox
          isCheck={termCheckValue.locationCheck}
          handleCheck={() => {
            useTermsStore.setState({
              locationCheck: !termCheckValue.locationCheck,
            });
          }}
          lineText="위치정보 이용약관 동의"
          requiredText="필수"
        />

        <TermTextBox
          isCheck={termCheckValue.sensitiveCheck}
          handleCheck={() => {
            useTermsStore.setState({
              sensitiveCheck: !termCheckValue.sensitiveCheck,
            });
          }}
          lineText="민감정보 이용 동의"
          requiredText="필수"
        />

        <TermTextBox
          isCheck={termCheckValue.marketingCheck}
          handleCheck={() => {
            useTermsStore.setState({
              marketingCheck: !termCheckValue.marketingCheck,
            });
          }}
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
