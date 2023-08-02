import React from 'react';
import SignUpLayout from '@layout/SignUpLayout/SignUpLayout';
import {StyledJobChipContainer} from '../JobScreen/JobScreen';
import {View} from 'react-native';
import {hobbyData} from './data/data';
import Chip from 'components/Chip';
import {useHobbyStore} from 'store/signup/signUpStore';

export default function HobbyScreen() {
  const selectHobby = useHobbyStore(state => state.selectHobby);
  const handleSelectHobby = useHobbyStore(state => state.handleSelectHobby);

  return (
    <SignUpLayout
      title={'취향을 골라주세요'}
      subTitle="최대 3개까지 선택 가능합니다">
      <StyledJobChipContainer style={{marginTop: 26}}>
        {hobbyData.map(hobby => {
          return (
            <View key={hobby.id}>
              <Chip
                label={hobby.label}
                select={selectHobby.includes(hobby.label)}
                onPress={() => handleSelectHobby(hobby.label)}
              />
            </View>
          );
        })}
      </StyledJobChipContainer>
    </SignUpLayout>
  );
}
