import React from 'react';
import SignUpLayout from '@layout/SignUpLayout/SignUpLayout';
import TermTextBox from 'components/TermTextBox';
import {StyledChipContainer} from '../GenderScreen/GenderScreen';
import styled from 'styled-components/native';
import {useTermsStore} from 'store/term/termStore';
import {shallow} from 'zustand/shallow';
import AllTermCheckbox from 'components/AllTermCheckbox';

export default function TermScreen() {
  const termCheckValue = useTermsStore(
    state => ({
      term: state.term,
      privacy: state.privacy,
      locationCheck: state.locationCheck,

      marketingCheck: state.marketingCheck,
    }),
    shallow,
  );

  const allChecked = Object.values(termCheckValue).every(
    value => value === true,
  );

  return (
    <SignUpLayout
      title={'이용약관에 동의해주세요'}
      disabled={
        !termCheckValue.term ||
        !termCheckValue.privacy ||
        !termCheckValue.locationCheck
      }>
      <StyledTermTextContainer>
        <TermTextBox
          url="https://happy-paper-ff2.notion.site/b92587ae482c47638dd679fb694f2804?pvs=74"
          isCheck={termCheckValue.term}
          handleCheck={() => {
            useTermsStore.setState({term: !termCheckValue.term});
          }}
          lineText="이용약관 동의"
          requiredText="필수"
        />

        <TermTextBox
          url="https://happy-paper-ff2.notion.site/a7ec4240b2454e9fbe0be40179a8bab4"
          isCheck={termCheckValue.privacy}
          handleCheck={() => {
            useTermsStore.setState({privacy: !termCheckValue.privacy});
          }}
          lineText="개인정보 수집 및 이용 동의"
          requiredText="필수"
        />

        <TermTextBox
          url="https://happy-paper-ff2.notion.site/982a037eefa9441cb472a2ad5daddcc9?pvs=74"
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
          url=""
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

        <AllTermCheckbox
          label="전체동의"
          isCheck={
            termCheckValue.term &&
            termCheckValue.privacy &&
            termCheckValue.locationCheck
          }
          handleCheck={() => {
            useTermsStore.setState({
              term: !allChecked,
              privacy: !allChecked,
              locationCheck: !allChecked,
              marketingCheck: !allChecked,
            });
          }}
        />
      </StyledTermTextContainer>
    </SignUpLayout>
  );
}

const StyledTermTextContainer = styled(StyledChipContainer)`
  display: flex;
  flex-direction: column;
`;
