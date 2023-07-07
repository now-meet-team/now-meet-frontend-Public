import {StyleSheet, View, Text} from 'react-native';
import React from 'react';
// import {useNavigation} from '@react-navigation/native';
import {shallow} from 'zustand/shallow';

import Input from '@components/Common/Input/Input';
import SignUpLayout from '@layout/SignUpLayout/SignUpLayout';
import {useNickNameStore} from 'store/signup/signUpStore';

export default function NickNameScreen() {
  const nickName = useNickNameStore(state => state.nickName, shallow);
  const handleNickName = useNickNameStore(state => state.handleNickName);

  return (
    <SignUpLayout title={'반갑습니다!\n닉네임을 입력해주세요😊'}>
      <Input
        onChangeText={text => handleNickName(text)}
        value={nickName}
        placeholder="닉네임을 입력해주세요"
      />
    </SignUpLayout>
  );
}
