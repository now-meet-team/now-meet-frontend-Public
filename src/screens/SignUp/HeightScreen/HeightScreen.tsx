import React from 'react';
import SignUpLayout from '@layout/SignUpLayout/SignUpLayout';
import Input from 'components/Common/Input/Input';
import {useHeightStore} from 'store/signup/signUpStore';

export default function HeightScreen() {
  const height = useHeightStore(state => state.height);
  const handleSelectGender = useHeightStore(state => state.handleSelectGender);

  return (
    <SignUpLayout title={'키를 입력해주세요'}>
      <Input
        maxLength={3}
        onChangeText={handleSelectGender}
        value={height}
        placeholder="키를 입력해주세요"
      />
    </SignUpLayout>
  );
}
