import React from 'react';
import SignUpLayout from '@layout/SignUpLayout/SignUpLayout';
import Chip from 'components/Chip';
import {jobData} from './data/data';

import styled from 'styled-components/native';
import {View} from 'react-native';
import {useJobStore} from 'store/signup/signUpStore';

export default function JobScreen() {
  const selectJob = useJobStore(state => state.selectJob);
  const handleSelectJob = useJobStore(state => state.handleSelectJob);

  return (
    <SignUpLayout title={'직업을 선택해주세요'}>
      <StyledJobChipContainer>
        {jobData.map((job, index) => {
          return (
            <View key={job.id}>
              <Chip
                label={job.label}
                select={index === selectJob}
                onPress={() => handleSelectJob(job.id)}
              />
            </View>
          );
        })}
      </StyledJobChipContainer>
    </SignUpLayout>
  );
}

const StyledJobChipContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  justify-content: center;
  align-items: center;

  width: 100%;

  gap: 5px;
`;
