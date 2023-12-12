import React, {useEffect} from 'react';
import SignUpLayout from '@layout/SignUpLayout/SignUpLayout';
import TextArea from 'components/TextArea';

import styled from 'styled-components/native';
import {useMySelfStore} from 'store/signup/signUpStore';
import {shallow} from 'zustand/shallow';
import {useRoute} from '@react-navigation/native';
import {ProfileType} from 'types/profile';

export default function SelfScreen() {
  const {params} = useRoute();

  const modeFromParams = (params as {mode: string})?.mode;
  const typeFromParams = (params as {type: string})?.type;
  const introduceFromParams = (params as ProfileType)?.introduce;

  const mySelfValue =
    useMySelfStore(state => state.mySelfValue, shallow) || introduceFromParams;
  const handleMySelfValue = useMySelfStore(state => state.handleMySelfValue);

  useEffect(() => {
    handleMySelfValue('');
  }, [handleMySelfValue]);

  return (
    <SignUpLayout
      mode={modeFromParams}
      type={typeFromParams}
      title={'자기소개 해주세요'}>
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
