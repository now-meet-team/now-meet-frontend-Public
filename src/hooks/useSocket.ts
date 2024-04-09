import {useCallback, useEffect, useState} from 'react';
import {GestureResponderEvent} from 'react-native';

import {Socket} from 'socket.io-client';
import {io} from 'socket.io-client';
import {ResponseMessageType} from 'types/chat';

import {retrieveUserSession} from 'utils/auth';

function useSocket(roomId: number) {
  const [messages, setMessages] = useState<ResponseMessageType[]>([]);
  const [message, setMessage] = useState<string>('');
  const [socket, setSocket] = useState<Socket | null>(null);

  const [chatRoomStatus, setChatRoomStatus] = useState('');

  const sendMessage = useCallback(
    (event: GestureResponderEvent) => {
      event.preventDefault();

      if (socket?.active) {
        socket.emit('message', {message: message, date: new Date()});
        setMessage('');
      }
    },
    [message, socket],
  );

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
        console.log('data-->>', data);
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
