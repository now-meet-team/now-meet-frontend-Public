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
import {StyleSheet, View} from 'react-native';
import Button from 'components/Common/Button/Button';
import {palette} from 'config/globalStyles';

export default function Account() {
  const navigation = useNavigation();
  const handleVisible = useModalStore(state => state.handleVisible);

  const configureGoogleSignIn = async () => {
    try {
    } catch (error) {
      console.error('Failed to configure Google Sign-In:', error);
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.configure({});
      await GoogleSignin.revokeAccess();
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
        <CustomModal title="로그아웃 하시겠습니까?">
          <View style={modalStyle.buttonContainer}>
            <Button
              style={[modalStyle.buttonStyle, modalStyle.buttonLogout]}
              color={palette.awesome}
              title={'로그아웃' || ''}
              onPress={() => signOut()}
            />
            <Button
              style={modalStyle.buttonStyle}
              backgroundColor={palette.awesome}
              title={'취소' || ''}
              onPress={() => useModalStore.setState({visible: false})}
            />
          </View>
        </CustomModal>

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

export const modalStyle = StyleSheet.create({
  modalContainer: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 260,
    height: 166,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 14,

    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 17,
    fontWeight: '400',
  },

  buttonContainer: {
    marginTop: 40,
    flexDirection: 'row',
    gap: 6,
  },

  buttonStyle: {
    width: 107,
    height: 38,
    borderRadius: 5,
  },

  buttonLogout: {
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.awesome,
  },
});
