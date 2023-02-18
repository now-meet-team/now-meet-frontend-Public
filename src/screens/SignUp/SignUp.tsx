import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {palette} from '../../config/globalStyles';
import Button from '../../components/Button/Button';
import {useNavigation} from '@react-navigation/native';
import SignUpLayout from '../../layout/SignUpLayout';

export default function SignUp() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <SignUpLayout title={'반갑습니다!\n닉네임을 입력해주세요😊'} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: palette.white,
  },
});
