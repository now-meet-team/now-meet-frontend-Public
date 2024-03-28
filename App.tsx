import React, {useEffect} from 'react';
import Routes from './src/navigation/Routes';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import messaging, {firebase} from '@react-native-firebase/messaging';
import {Alert} from 'react-native';

// Create a client
const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    requestUserPermission();
  }, []);

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();

    console.log('[FCM Token] ', fcmToken);
  };

  const requestUserPermission = async () => {
    getFcmToken();
    const authorizationStatus = await messaging().requestPermission();

    // 권한상태 (-1: 요청 안함, 0: 거부, 1: 수락, 2: 임시권한)
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <BottomSheetModalProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </QueryClientProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
