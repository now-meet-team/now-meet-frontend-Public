import notifee, {AndroidImportance, EventType} from '@notifee/react-native';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {NavigationProp} from '@react-navigation/native';

export const displayNotification = async (
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

export const onForegroundEvent = () => {
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
