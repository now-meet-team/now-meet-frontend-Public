import {View} from 'react-native';
import React, {useEffect} from 'react';
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';
import {useNavigation} from '@react-navigation/native';
import {storeUserSession} from 'utils/auth';
import {usePostIsSignIn} from 'lib/mutation/auth';

export default function AppleSigninButton() {
  const navigation = useNavigation();
  const {useSignInMutation} = usePostIsSignIn();

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
      await storeUserSession(
        'idToken',
        `${appleAuthRequestResponse?.identityToken}`,
      );

      console.log('ios-->', appleAuthRequestResponse?.identityToken);

      useSignInMutation.mutate(appleAuthRequestResponse.user);
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
          backgroundColor: 'black',
        }}
        onPress={() => onAppleButtonPress()}
      />
    </View>
  );
}
