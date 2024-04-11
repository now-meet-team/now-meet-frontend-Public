import React from 'react';

import styled from 'styled-components/native';
import {palette} from 'config/globalStyles';

import Button from 'components/Common/Button/Button';

import {DmSVG, StoreSVG, SettingSVG, GhostSVG, RightSVG} from '../../assets';
import SettingList, {
  ProfileSVGText,
  ProfileSVGTextContainer,
} from 'components/SettingList';
import {useNavigation} from '@react-navigation/native';
import ProfileLayout from 'components/ProfileLayout';
import {useProfileMe} from 'services/query/profile';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSwitchStore} from 'store/switch/switchStore';

export default function Profile() {
  const navigation = useNavigation();

  const {queryProfileData} = useProfileMe();

  const handleSwitch = useSwitchStore(state => state.handleSwitch);

  return (
    <ProfileSafeAreaView>
      <ProfileSettingContainer>
        <ProfileLayout
          uri={queryProfileData?.PreSignedUrl[0] || ''}
          nickname={queryProfileData?.user.nickname || ''}
          subText={
            queryProfileData?.user.job ||
            '' + queryProfileData?.user.birthDate ||
            ''
          }
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('EditUserProfile' as never)}>
          <ProfileSVGTextContainer>
            <ProfileEditText>{'프로필 수정'}</ProfileEditText>

            <RightSVG color={palette.primaryB2} />
          </ProfileSVGTextContainer>
        </TouchableOpacity>
      </ProfileSettingContainer>

      <ProfileSVGContainer>
        <SettingList
          onChange={handleSwitch}
          label="유령모드"
          SvgComponent={GhostSVG}
          mode="switch"
        />

        <SettingList
          label="스토어"
          SvgComponent={StoreSVG}
          mode="arrow"
          onClick={() => {}}
        />

        <SettingList
          label="보낸 좋아요"
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

const ProfileSettingContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-right: 20px;
`;

const ProfileEditText = styled(ProfileSVGText)`
  color: ${palette.primaryB2};
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
  padding: 15px;
`;
