import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SignUpLayout from '../../../layout/SignUpLayout';

export default function TermScreen() {
  return (
    <SignUpLayout title={'이용약관에 동의해주세요'}>
      {/* <Input value={''} placeholder="닉네임을 입력해주세요" /> */}
    </SignUpLayout>
  );
}

const styles = StyleSheet.create({});
