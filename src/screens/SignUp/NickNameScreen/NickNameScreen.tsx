import {StyleSheet, View, Text} from 'react-native';
import React from 'react';
// import {useNavigation} from '@react-navigation/native';

import Input from '@components/Common/Input/Input';
import SignUpLayout from '@layout/SignUpLayout/SignUpLayout';

export default function NickNameScreen() {
  return (
    <SignUpLayout title={'반갑습니다!\n닉네임을 입력해주세요😊'}>
      <Input value={''} placeholder="닉네임을 입력해주세요" />
    </SignUpLayout>
  );
}
