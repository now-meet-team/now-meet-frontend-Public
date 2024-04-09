import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {
  FirebaseMessagingTypes,
  firebase,
} from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {storeUserSession} from 'utils/auth';
import {RootStackNavigationProp} from 'navigation/Routes';
import {useNavigation} from '@react-navigation/native';

const useNotification = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

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

  const displayNotification = async (
    message: FirebaseMessagingTypes.RemoteMessage,
  ) => {
    const channel = await androidCreateChannel(
      String(message?.data?.screenName) || '',
    );

    await notifee.requestPermission();

    try {
      await notifee.displayNotification({
        title: message?.notification?.title || '',
        body: message?.notification?.body || '',
        data: {
          chatId: message?.data?.chatId || '',
          category: message?.data?.screenName || '',
        },
        android: {
          channelId: channel,
          smallIcon: 'ic_launcher',
          color: '#FF234A',
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const androidCreateChannel = async (category: string) => {
    const channel = await notifee.createChannel({
      id: 'default',
      name: category,
      importance: AndroidImportance.HIGH,
    });

    return channel;
  };

  const onForegroundEvent = () => {
    notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;

        case EventType.PRESS:
          switch (detail.notification?.data?.category) {
            case 'ChatList':
              navigation.navigate('ChatList');
              break;

            case 'ChatRoom':
              navigation.navigate('ChatRoom', {
                chatId: Number(detail.notification?.data?.chatId),
                name: String(detail.notification?.title),
              });
              break;

            case 'Inbox':
              navigation.navigate('Inbox');
              break;

            default:
              break;
          }

          break;
      }
    });
  };

  const onBackgroundEvent = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(remoteMessage);
      const screenName = remoteMessage.data?.screenName;
      switch (screenName) {
        case 'ChatList':
          navigation.navigate('ChatList');
          break;

        case 'ChatRoom':
          navigation.navigate('ChatRoom', {
            chatId: Number(remoteMessage.data?.chatId),
            name: String(remoteMessage.notification?.title),
          });
          break;

        case 'Inbox':
          navigation.navigate('Inbox');
          break;

        default:
          break;
      }
    });
  };

  useEffect(() => {
    requestUserPermission();

    const setupNotificationHandlers = async () => {
      firebase.messaging().onMessage(async remoteMessage => {
        displayNotification(remoteMessage);
      });
    };

    setupNotificationHandlers();
    onForegroundEvent();
    onBackgroundEvent();

    return () => {};
  }, []);

  return {displayNotification};
};

export default useNotification;
