import React, {useEffect} from 'react';
import SignUpLayout from '@layout/SignUpLayout/SignUpLayout';
import TextArea from 'components/TextArea';
import styled from 'styled-components/native';
import {useMySelfStore} from 'store/signup/signUpStore';
import {shallow} from 'zustand/shallow';
import {useRoute} from '@react-navigation/native';
import {ProfileType} from 'types/profile';

import AdviseSVG from '../../../assets/svg/Advise.svg';

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
      disabled={!mySelfValue}
      mode={modeFromParams}
      type={typeFromParams}
      title={'자신을 소개해주세요!'}>
      <AdviseContainer>
        <StyledAdviseSVG width={15} height={15} />
        <StyledSubText>
          SNS 및 연락처 등 부적절한 내용 기재시 제재처리
        </StyledSubText>
      </AdviseContainer>

      <TextArea value={mySelfValue} onChangeText={handleMySelfValue} />
    </SignUpLayout>
  );
}

const AdviseContainer = styled.View`
  height: 36px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 10px;

  background-color: rgba(237, 65, 65, 0.1);

  border-radius: 8px;
`;

const StyledSubText = styled.Text`
  width: 100%;
  font-size: 14px;
  padding-left: 24px;
  color: rgb(237, 65, 65);
`;

const StyledAdviseSVG = styled(AdviseSVG)`
  position: relative;
  left: 20px;
`;
