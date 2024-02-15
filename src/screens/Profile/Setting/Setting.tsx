import React from 'react';
import {ProfileBottomLine, ProfileSVGContainer} from 'screens/Profile/Profile';
import SettingList from 'components/SettingList';
import styled from 'styled-components/native';
import {palette} from 'config/globalStyles';
import {useNavigation} from '@react-navigation/native';

export default function Setting() {
  const navigation = useNavigation();

  return (
    <ProfileSettingContainer>
      <ProfileSettingSVGContainer>
        <SettingList label="좋아요 알림" mode="switch" />
        <SettingList label="채팅 메시지 알림" mode="switch" />
        <SettingList label="매칭 알림" mode="switch" />
      </ProfileSettingSVGContainer>

      <ProfileSettingLine />

      <ProfileSettingSettingListContainer>
        <SettingList
          label="계정"
          mode="arrow"
          onClick={() => {
            navigation.navigate('Account' as never);
          }}
        />
        <SettingList
          label="고객센터"
          mode="arrow"
          onClick={() => navigation.navigate('CustomerService' as never)}
        />
      </ProfileSettingSettingListContainer>
    </ProfileSettingContainer>
  );
}

export const ProfileSettingContainer = styled.View`
  flex: 1;
  background-color: ${palette.white};
`;

const ProfileSettingSVGContainer = styled(ProfileSVGContainer)`
  margin-top: 16px;
`;

const ProfileSettingLine = styled(ProfileBottomLine)`
  margin-top: 4px;
`;

const ProfileSettingSettingListContainer = styled.View`
  padding: 16px;
`;
