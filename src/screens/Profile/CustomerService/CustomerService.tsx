import {View, Text, Linking} from 'react-native';
import React from 'react';
import {ProfileSafeAreaView} from '../Profile';
import SettingList from 'components/SettingList';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

export default function CustomerService() {
  const navigation = useNavigation();

  return (
    <ProfileSafeAreaView>
      <CustomerWrapper>
        <SettingList label="도움말" mode="arrow" />

        <SettingList label="문의하기" mode="arrow" />

        <SettingList
          label="이용약관"
          mode="arrow"
          onClick={() =>
            Linking.openURL(
              'https://happy-paper-ff2.notion.site/b92587ae482c47638dd679fb694f2804?pvs=74',
            )
          }
        />

        <SettingList
          label="개인정보 처리 방침"
          mode="arrow"
          onClick={() =>
            Linking.openURL(
              'https://happy-paper-ff2.notion.site/a7ec4240b2454e9fbe0be40179a8bab4',
            )
          }
        />

        <SettingList
          label="위치기반 서비스 이용약관"
          mode="arrow"
          onClick={() =>
            Linking.openURL(
              'https://happy-paper-ff2.notion.site/982a037eefa9441cb472a2ad5daddcc9?pvs=74',
            )
          }
        />
      </CustomerWrapper>
    </ProfileSafeAreaView>
  );
}

export const CustomerWrapper = styled.View`
  padding: 15px;
`;
