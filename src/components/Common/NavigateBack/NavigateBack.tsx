import {Button, View} from 'react-native';
import React from 'react';
import {useNavigationStore} from 'store/signup/signUpStore';
import {useNavigation} from '@react-navigation/native';

export default function NavigateBack() {
  const navigation = useNavigation();
  const pageNumber = useNavigationStore(state => state.pageNumber);
  const handlePrevPage = useNavigationStore(state => state.handlePrevPage);

  const signUpBackNavigate = () => {
    if (navigation.getState().routes[1].name === 'SignUp' && pageNumber === 0) {
      navigation.navigate('Home' as never);
    }

    if (navigation.canGoBack()) {
      handlePrevPage();
    }
  };

  const otherBackNavigate = () => {
    return navigation.goBack();
  };

  return (
    <View>
      <Button
        onPress={() => {
          if (navigation.getState().routes[1].name === 'SignUp') {
            signUpBackNavigate();
          } else {
            otherBackNavigate();
          }
        }}
        title="<"
        color="black"
      />
    </View>
  );
}
