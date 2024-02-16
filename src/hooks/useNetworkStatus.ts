import {useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';

const useNetworkStatus = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Toast.show({
          type: 'error',
          text1: 'Network',
          text2:
            '데이터 또는 Wifi 연결 상태 확인 후 잠시 후 다시 시도해주세요.',
        });

        navigation.navigate('NetworkError' as never);
      }

      if (state.isConnected && navigation.canGoBack()) {
        navigation.goBack();
      }
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);
};

export default useNetworkStatus;
