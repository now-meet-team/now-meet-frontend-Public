import React from 'react';
import SignUpLayout from '@layout/SignUpLayout/SignUpLayout';
import Chip from 'components/Chip';
import {jobData} from './data/data';

import styled from 'styled-components/native';
import {Text, TextInput, View} from 'react-native';
import {useJobStore} from 'store/signup/signUpStore';
import {useRoute} from '@react-navigation/native';
import {ProfileType} from 'types/profile';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
      title={'직업을 선택해주세요'}>
      <JobContainer>
        {jobData?.map(job => {
          return (
            <TouchableOpacity
              key={job.id}
              onPress={() => handleSelectJob(job.label)}>
              <JobWrapper>
                <JobText>{job.label}</JobText>
              </JobWrapper>
            </TouchableOpacity>
          );
        })}

        {/* <ChipAndInputContainer>
          <Chip
            label={selectJob === 'custom' ? ' ' : etcJob || '직접 입력'}
            select={selectJob === 'custom'}
            onPress={() => handleSelectJob('custom')}
          />
          {selectJob === 'custom' && (
            <StyledCustomJobContainer>
              <TextInput
                maxLength={6}
                placeholder="직접 입력"
                placeholderTextColor="white"
                value={etcJob}
                onChangeText={handleEtcJob}
              />
            </StyledCustomJobContainer>
          )}
        </ChipAndInputContainer> */}
      </JobContainer>
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
  gap: 5px;
`;

export const ChipAndInputContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const StyledCustomJobContainer = styled.View`
  position: absolute;
`;

export const JobContainer = styled.View`
  padding-left: 20px;
  padding-right: 20px;
  gap: 20px;

  font-size: 18px;
`;

export const JobWrapper = styled.View`
  width: 100%;
`;

export const JobText = styled.Text`
  font-size: 18px;
`;
