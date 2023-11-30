import React from 'react';

import styled from 'styled-components/native';
import {palette} from 'config/globalStyles';

import Button from 'components/Common/Button/Button';

import {DmSVG, StoreSVG, SettingSVG, GhostSVG} from '../../assets';
import SettingList from 'components/SettingList';
import {useNavigation} from '@react-navigation/native';
import ProfileLayout from 'components/ProfileLayout';
import {useProfileMe} from 'lib/query/profile';

export default function Profile() {
  const navigation = useNavigation();

  const {queryProfileData} = useProfileMe();

  return (
    <ProfileSafeAreaView>
      <ProfileLayout
        uri={queryProfileData?.PreSignedUrl[0] || ''}
        nickname={queryProfileData?.user.nickname || ''}
        subText={
          queryProfileData?.user.job ||
          '' + queryProfileData?.user.birthDate ||
          ''
        }
      />

      <ProfileButton
        title="프로필 수정"
        padding={'12px 24px'}
        onPress={() => {
          navigation.navigate('EditUserProfile' as never);
        }}
      />

      <ProfileBottomLine />

      <ProfileSVGContainer>
        <SettingList label="유령모드" SvgComponent={GhostSVG} mode="switch" />

        <SettingList
          label="스토어"
          SvgComponent={StoreSVG}
          mode="arrow"
          onClick={() => {}}
        />

        <SettingList
          label="좋아요 발신함"
          SvgComponent={DmSVG}
          mode="arrow"
          onClick={() => {
            navigation.navigate('LikedMessageList' as never);
          }}
        />

        <SettingList
          label="환경설정"
          SvgComponent={SettingSVG}
          mode="arrow"
          onClick={() => {
            navigation.navigate('Setting' as never);
          }}
        />
      </ProfileSVGContainer>
    </ProfileSafeAreaView>
  );
}

export const ProfileSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${palette.white};
`;

const ProfileButton = styled(Button)`
  width: 345px;
  align-self: center;
  background-color: ${palette.awesome};
  margin-top: 15px;
  margin-bottom: 30px;
`;

export const ProfileBottomLine = styled.View`
  border: 1px solid ${palette.progressColor};
`;

export const ProfileSVGContainer = styled.View`
  margin-top: 30px;
  padding: 15px;
`;
