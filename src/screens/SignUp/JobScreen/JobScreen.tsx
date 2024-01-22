import React from 'react';
import SignUpLayout from '@layout/SignUpLayout/SignUpLayout';

import {jobData} from './data/data';

import styled from 'styled-components/native';

import {useJobStore} from 'store/signup/signUpStore';
import {useRoute} from '@react-navigation/native';
import {ProfileType} from 'types/profile';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import CheckSVG from '../../../assets/svg/Check.svg';
import Input from 'components/Common/Input/Input';

export default function JobScreen() {
  const {params} = useRoute();

  const modeFromParams = (params as {mode: string})?.mode;
  const typeFromParams = (params as {type: string})?.type;
  const jobFromParams = (params as ProfileType)?.job;

  //직업 선택
  const selectJob = useJobStore(state => state.selectJob) || jobFromParams;
  const handleSelectJob = useJobStore(state => state.handleSelectJob);

  //직접 입력
  const etcJob = useJobStore(state => state.etcJob);
  const handleEtcJob = useJobStore(state => state.handleEtcJob);

  return (
    <SignUpLayout
      mode={modeFromParams}
      type={typeFromParams}
      disabled={!selectJob}
      title={'직업을 선택해주세요.'}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 180}}>
        <JobContainer>
          {jobData?.map(job => {
            return (
              <TouchableOpacity
                key={job.id}
                onPress={() => handleSelectJob(job.label)}>
                <JobWrapper>
                  <JobText>{job.label}</JobText>
                  {job.label === selectJob && <CheckSVG fill={'#000'} />}
                </JobWrapper>
              </TouchableOpacity>
            );
          })}
        </JobContainer>

        {selectJob === '기타' && (
          <StyledCustomJobContainer>
            <Input
              maxLength={6}
              placeholder="직업을 입력해주세요."
              value={etcJob}
              onChangeText={handleEtcJob}
            />
          </StyledCustomJobContainer>
        )}
      </ScrollView>
    </SignUpLayout>
  );
}

export const StyledJobChipContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 15px;
`;

export const ChipAndInputContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const StyledCustomJobContainer = styled.View`
  flex: 1;
  width: 100%;
  padding-left: 0;
  margin: 0;
`;

export const JobContainer = styled.View`
  padding-left: 20px;
  padding-right: 20px;

  font-size: 18px;
`;

export const JobWrapper = styled.View`
  width: 100%;
  height: 42px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const JobText = styled.Text`
  font-size: 18px;
`;
