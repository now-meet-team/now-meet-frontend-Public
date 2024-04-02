import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import messaging, {firebase} from '@react-native-firebase/messaging';
import {storeUserSession} from 'utils/auth';

const useNotification = () => {
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
    category?: string,
  ) => {
    const channel = await androidCreateChannel();

    await notifee.requestPermission();

    try {
      await notifee.displayNotification({
        title: message?.notification?.title || '',
        body: message?.notification?.body || '',
        data: {mysupervalue: 1},
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

  const androidCreateChannel = async () => {
    const channel = await notifee.createChannel({
      id: 'default',
      name: 'category1',
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
          if (detail.notification?.title === '메세지') {
            console.log('메세지방!');
          }
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
  };

  const onBackgroundEvent = () => {
    notifee.onBackgroundEvent(async ({type, detail}) => {
      const {notification} = detail;
      console.log(notification);
      if (type === EventType.DELIVERED) {
      }
    });
  };

  useEffect(() => {
    requestUserPermission();
    // 이 훅이 마운트될 때 실행되는 코드
    const setupNotificationHandlers = async () => {
      firebase.messaging().onMessage(async remoteMessage => {
        displayNotification(remoteMessage);
      });

      onForegroundEvent();
      onBackgroundEvent();
    };

    setupNotificationHandlers();

    return () => {
      // 여기서 사용된 이벤트 리스너를 제거하는 작업을 수행할 수 있습니다.
      // 예를 들어, notifee.offForegroundEvent(), notifee.offBackgroundEvent() 등을 호출할 수 있습니다.
    };
  }, []);
};

export default useNotification;
