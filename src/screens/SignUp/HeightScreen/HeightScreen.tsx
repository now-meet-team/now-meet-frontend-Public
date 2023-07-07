import React from 'react';
import SignUpLayout from '@layout/SignUpLayout/SignUpLayout';
import Input from 'components/Common/Input/Input';

export default function HeightScreen() {
  return (
    <SignUpLayout title={'키를 입력해주세요'}>
      <Input
        onChangeText={() => {}}
        value={''}
        placeholder="키를 입력해주세요"
      />
    </SignUpLayout>
  );
}
