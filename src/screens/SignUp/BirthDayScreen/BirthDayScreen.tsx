import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SignUpLayout from '../../../layout/SignUpLayout';
import DatePicker from 'react-native-date-picker';
import CustomDatePicker from '../../../components/Common/DatePicker/CustomDatePicker';

export default function BirthDayScreen() {
  return (
    <SignUpLayout title={'생년월일을 선택해주세요'}>
      <CustomDatePicker />
      {/* <Input value={''} placeholder="닉네임을 입력해주세요" /> */}
    </SignUpLayout>
  );
}

const styles = StyleSheet.create({});
