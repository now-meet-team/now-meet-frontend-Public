import {useEffect, useState} from 'react';
import {GestureResponderEvent} from 'react-native';
import {Notifications} from 'react-native-notifications';
import {Socket} from 'socket.io-client';
import {io} from 'socket.io-client';
import {DataMessageType, ResponseMessageType} from 'types/chat';

import {retrieveUserSession} from 'utils/auth';

function useSocket(roomId: number) {
  const [messages, setMessages] = useState<ResponseMessageType[]>([]);
  const [message, setMessage] = useState<string>('');
  const [socket, setSocket] = useState<Socket | null>(null);

  const [chatRoomStatus, setChatRoomStatus] = useState('');

  const sendMessage = (event: GestureResponderEvent) => {
    event.preventDefault();

    if (socket?.active) {
      socket.emit('message', {message: message, date: new Date()});
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

      /** 채팅방 연결 **/
      newSocket.on('connect', () => {
        console.log(newSocket.id);
      });

      /** 메세지 리스트에 관련된 소켓 **/
      newSocket?.on('message_list', (data: ResponseMessageType[]) => {
        setMessages(data);
      });

      /** 메세지에 관련된 소켓 **/
      newSocket.on('message', (data: ResponseMessageType) => {
        setMessages(prev => prev.concat(data));
      });

      /** 채팅방 status에 관련된 소켓 **/
      newSocket.on('status', (data: string) => {
        setChatRoomStatus(data);
      });

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
    chatRoomStatus,
    sendMessage,
    setMessage,
    message,
    socket,
    messages,
    setMessages,
  };
}

export default useSocket;
