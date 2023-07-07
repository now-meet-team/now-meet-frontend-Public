import React from 'react';
import SignUpLayout from '@layout/SignUpLayout/SignUpLayout';
import Chip from 'components/Chip';
import {jobData} from './data/data';
import {StyledChipContainer} from '../GenderScreen/GenderScreen';
import styled from 'styled-components/native';

export default function JobScreen() {
  return (
    <SignUpLayout title={'직업을 선택해주세요'}>
      {jobData.map(job => {
        return (
          <StyledJobChipContainer key={job.id}>
            <Chip label={job.label} select={false} onPress={() => {}} />
          </StyledJobChipContainer>
        );
      })}
    </SignUpLayout>
  );
}

const StyledJobChipContainer = styled.View`
  display: flex;
  flex-direction: row;
`;
