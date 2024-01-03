import React from 'react';
import {
  ProfileSVGContainer,
  ProfileSafeAreaView,
} from 'screens/Profile/Profile';
import SettingList from 'components/SettingList';
import CustomModal from 'components/CustomModal';
import {useModalStore} from 'store/modal/modalStore';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import {removeUserSession} from 'utils/auth';

export default function Account() {
  const navigation = useNavigation();
  const handleVisible = useModalStore(state => state.handleVisible);

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      handleVisible(false);
      await removeUserSession('idToken');
      navigation.navigate('Home' as never);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProfileSafeAreaView>
      <ProfileSVGContainer>
        <CustomModal
          title="로그아웃 하시겠습니까?"
          leftButtonTitle="로그아웃"
          rightButtonTitle="취소"
          onPress={() => signOut()}
        />

        <SettingList
          label="로그아웃"
          mode="arrow"
          onClick={() => handleVisible(true)}
        />

        <SettingList
          label="계정삭제"
          mode="arrow"
          onClick={() => navigation.navigate('UserDelete' as never)}
        />
      </ProfileSVGContainer>
    </ProfileSafeAreaView>
  );
}
