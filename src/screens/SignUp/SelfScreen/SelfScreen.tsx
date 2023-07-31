import React from 'react';
import SignUpLayout from '@layout/SignUpLayout/SignUpLayout';
import TextArea from 'components/TextArea';

import styled from 'styled-components/native';
import {useMySelfStore} from 'store/signup/signUpStore';
import {shallow} from 'zustand/shallow';

export default function SelfScreen() {
  const mySelfValue = useMySelfStore(state => state.mySelfValue, shallow);
  const handleMySelfValue = useMySelfStore(state => state.handleMySelfValue);

  return (
    <SignUpLayout title={'자기소개 해주세요'}>
      <TextArea value={mySelfValue} onChangeText={handleMySelfValue} />
      <StyledSubText>
        * SNS 및 연락처 등 부적절한 내용 기재시 제재처리
      </StyledSubText>
    </SignUpLayout>
  );
}

const StyledSubText = styled.Text`
  width: 100%;
  text-align: right;

  padding-top: 9px;
  padding-right: 20px;

  color: #ed4141;
`;
