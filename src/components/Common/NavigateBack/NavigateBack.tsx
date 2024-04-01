import {Button, View} from 'react-native';
import React from 'react';
import {useNavigationStore} from 'store/signup/signUpStore';
import {useNavigation} from '@react-navigation/native';
import {BackArrow} from 'assets';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function NavigateBack(props: {label: string}) {
  const {label} = props;

  const navigation = useNavigation();
  const pageNumber = useNavigationStore(state => state.pageNumber);
  const handlePrevPage = useNavigationStore(state => state.handlePrevPage);

  const signUpBackNavigate = () => {
    if (label === 'SignUp' && pageNumber === 0) {
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
      <TouchableOpacity
        onPress={() => {
          if (label === 'SignUp') {
            signUpBackNavigate();
          } else {
            otherBackNavigate();
          }
        }}>
        <BackArrow />
      </TouchableOpacity>
    </View>
  );
}
