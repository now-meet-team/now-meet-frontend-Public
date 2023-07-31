import React from 'react';
import SignUpLayout from '@layout/SignUpLayout/SignUpLayout';
import TextArea from 'components/TextArea';
import {Text} from 'react-native';
import styled from 'styled-components/native';

export default function SelfScreen() {
  return (
    <SignUpLayout title={'자기소개 해주세요'}>
      <TextArea />
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
