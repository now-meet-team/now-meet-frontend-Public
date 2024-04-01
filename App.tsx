import React, {useEffect} from 'react';
import Routes from './src/navigation/Routes';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import messaging from '@react-native-firebase/messaging';

import {storeUserSession} from 'utils/auth';

// Create a client
const queryClient = new QueryClient();

export default function App() {
  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    await storeUserSession('fcmToken', `${fcmToken}`);

    console.log('[FCM Token] ', fcmToken);
  };

  const requestUserPermission = async () => {
    getFcmToken();
    const authorizationStatus = await messaging().requestPermission();

    // 권한상태 (-1: 요청 안함, 0: 거부, 1: 수락, 2: 임시권한)
  };

  useEffect(() => {
    requestUserPermission();
  }, []);

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
