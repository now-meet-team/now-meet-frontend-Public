import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SignUpLayout from '../../../layout/SignUpLayout/SignUpLayout';
import Chip from 'components/Chip';
import styled from 'styled-components/native';
import {useGenderStore} from 'store/signup/signUpStore';

export default function GenderScreen() {
  const selectGender = useGenderStore(state => state.selectGender);
  const handleSelectGender = useGenderStore(state => state.handleSelectGender);

  return (
    <>
      <SignUpLayout title={'성별을 골라주세요'}>
        <StyledChipContainer>
          <Chip
            label="남성"
            select={selectGender === 'men'}
            onPress={() => handleSelectGender('men')}
          />
          <Chip
            label="여성"
            select={selectGender === 'women'}
            onPress={() => handleSelectGender('women')}
          />
        </StyledChipContainer>
      </SignUpLayout>
    </>
  );
}

export const StyledChipContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 6px;
  padding: 20px;
`;
