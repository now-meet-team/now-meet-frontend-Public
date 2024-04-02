import notifee, {AndroidImportance} from '@notifee/react-native';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

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
    name: 'category1', // 저는 카테고리 세분화가 필요 없어 서비스 이름으로 적용했습니다.
    importance: AndroidImportance.HIGH,
  });

  return channel;
};
