import {View} from 'react-native';
import React, {useEffect} from 'react';
import {
  AppleButton,
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import {useNavigation} from '@react-navigation/native';

export default function AppleSigninButton() {
  const navigation = useNavigation();

  useEffect(() => {
    return appleAuth.onCredentialRevoked(async () => {
      console.warn(
        'If this function executes, User Credentials have been Revoked',
      );
    });
  }, []);

  async function onAppleButtonPress() {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );

    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
      console.log(appleAuthRequestResponse);
      console.log('로구인!!');
    }
  }

  return (
    <View>
      <AppleButton
        buttonStyle={AppleButton.Style.BLACK}
        buttonType={AppleButton.Type.SIGN_IN}
        style={{
          width: '100%',
          height: 40,
          borderRadius: 15,
          backgroundColor: 'black',
        }}
        onPress={() => onAppleButtonPress()}
      />
    </View>
  );
}
