import {useEffect, useState} from 'react';
import {GestureResponderEvent} from 'react-native';
import {Notifications} from 'react-native-notifications';
import {Socket} from 'socket.io-client';
import {io} from 'socket.io-client';
import {ResponseMessageType} from 'types/chat';

import {retrieveUserSession} from 'utils/auth';

function useSocket(roomId: number) {
  const [messages, setMessages] = useState<ResponseMessageType[]>([]);
  const [message, setMessage] = useState<string>('');
  const [socket, setSocket] = useState<Socket | null>(null);

  const sendMessage = async (event: GestureResponderEvent) => {
    event.preventDefault();

    if (socket?.active) {
      socket.emit('message', message);
      setMessage('');
    }

    // Notifications.postLocalNotification({
    //   body: 'Local notification!',
    //   title: 'Local Notification Title',

    //   sound: 'chime.aiff',
    //   type: '??',
    //   payload: '??',
    //   thread: '??',
    //   badge: 123,

    //   // userInfo: { },
    //   identifier: '??',
    // });
  };

  useEffect(() => {
    let newSocket: Socket;

    const initializeSocket = async () => {
      const getToken = await retrieveUserSession('idToken');

      newSocket = io('https://nowmeet.org/chats', {
        auth: {token: getToken},
        query: {
          roomId: roomId,
        },
      });

      newSocket.on('connect', () => {
        console.log(newSocket.id);
      });

      newSocket.on(
        'message',
        (data: {
          chatRoomId: number;
          content: string;
          id: number;
          senderId: number;
          senderNickname: string;
        }) => {
          setMessages(prev => [...prev, data]);
        },
      );

      setSocket(newSocket);
    };

    initializeSocket();

    return () => {
      if (newSocket) {
        newSocket.disconnect();
        newSocket.removeAllListeners();
        newSocket.off('message');
      }
    };
  }, [roomId]);

  return {
    sendMessage,
    setMessage,
    message,
    socket,
    messages,
    setMessages,
  };
}

export default useSocket;
