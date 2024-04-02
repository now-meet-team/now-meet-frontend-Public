import React, {useEffect} from 'react';
import Routes from './src/navigation/Routes';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';

import messaging, {firebase} from '@react-native-firebase/messaging';

import {storeUserSession} from 'utils/auth';

import {displayNotification} from 'utils/notifee';
import {Alert} from 'react-native';

// Create a client
const queryClient = new QueryClient();

export default function App() {
  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    await storeUserSession('fcmToken', `${fcmToken}`);

    console.log('[FCM Token] ', fcmToken);
  };

  const requestUserPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();

    const enabled =
      authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      return getFcmToken();
    }
  };

  useEffect(() => {
    requestUserPermission();

    firebase.messaging().onMessage(async remoteMessage => {
      displayNotification(remoteMessage);
    });
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
