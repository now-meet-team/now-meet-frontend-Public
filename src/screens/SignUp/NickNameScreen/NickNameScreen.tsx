import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
// import {useNavigation} from '@react-navigation/native';
import SignUpLayout from '../../../layout/SignUpLayout';
import {palette} from '../../../config/globalStyles';
import Input from '../../../components/Common/Input/Input';

export default function NickNameScreen() {
  return (
    <SignUpLayout title={'반갑습니다!\n닉네임을 입력해주세요😊'}>
      <Input placeholder="닉네임을 입력해주세요" />
    </SignUpLayout>
  );
}
