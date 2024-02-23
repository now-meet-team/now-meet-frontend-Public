import React from 'react';
import Routes from './src/navigation/Routes';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {
  Notifications,
  Registered,
  RegistrationError,
} from 'react-native-notifications';
import {Platform} from 'react-native';

// Create a client
const queryClient = new QueryClient();

export default function App() {
  // React.useEffect(() => {
  //   // Request permissions on iOS, refresh token on Android

  //   if (Platform.OS === 'android') {
  //     Notifications.registerRemoteNotifications();
  //   } else if (Platform.OS === 'ios') {
  //     Notifications.ios.registerRemoteNotifications({
  //       providesAppNotificationSettings: true,
  //       provisional: true,
  //       carPlay: true,
  //       criticalAlert: true,
  //     });

  //     Notifications.events().registerRemoteNotificationsRegistered(
  //       (event: Registered) => {
  //         // TODO: Send the token to my server so it could send back push notifications...
  //         console.log('Device Token Received', event.deviceToken);
  //       },
  //     );

  //     Notifications.events().registerRemoteNotificationsRegistrationFailed(
  //       (event: RegistrationError) => {
  //         console.error(event);
  //       },
  //     );

  //     Notifications.ios.checkPermissions().then(currentPermissions => {
  //       console.log('Badges enabled: ' + !!currentPermissions.badge);
  //       console.log('Sounds enabled: ' + !!currentPermissions.sound);
  //       console.log('Alerts enabled: ' + !!currentPermissions.alert);
  //       console.log('Car Play enabled: ' + !!currentPermissions.carPlay);
  //       console.log(
  //         'Critical Alerts enabled: ' + !!currentPermissions.criticalAlert,
  //       );
  //       console.log('Provisional enabled: ' + !!currentPermissions.provisional);
  //       console.log(
  //         'Provides App Notification Settings enabled: ' +
  //           !!currentPermissions.providesAppNotificationSettings,
  //       );
  //       console.log(
  //         'Announcement enabled: ' + !!currentPermissions.announcement,
  //       );
  //     });
  //   }

  //   Notifications.events().registerNotificationReceivedForeground(
  //     (notification, completion) => {
  //       console.log(
  //         `Notification received in foreground: ${notification.title} : ${notification.body}`,
  //       );
  //       completion({alert: true, sound: true, badge: true});
  //     },
  //   );

  //   Notifications.events().registerNotificationOpened(
  //     (notification, completion) => {
  //       console.log(`Notification opened: ${notification.payload}`);
  //       completion();
  //     },
  //   );
  // }, []);

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
