import {useQueryClient} from '@tanstack/react-query';
import {CHAT_ROOM_QUERY_KEY} from 'lib/query/chat';
import {useEffect, useState} from 'react';
import {GestureResponderEvent} from 'react-native';
import {Socket} from 'socket.io-client';
import {io} from 'socket.io-client';
import {retrieveUserSession} from 'utils/auth';

function useSocket(roomId: number) {
  const queryClient = useQueryClient();

  const [messages, setMessages] = useState([]);

  const [message, setMessage] = useState<string>('');
  const [socket, setSocket] = useState<Socket | null>(null);

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
        setSocket(newSocket);
      });

      newSocket.on('new-message', (data: any) => {
        console.log('data----->>', data);

        receiveMessage(data);
      });
    };

    initializeSocket();
  }, [roomId]);

  const sendMessage = (event: GestureResponderEvent) => {
    event.preventDefault();

    if (socket?.active) {
      socket.emit('message', message);
    }
    setMessage('');
  };

  const receiveMessage = (msg: any) => {
    console.log(msg);
  };

  return {
    sendMessage,
    setMessage,
    message,
    socket,
  };
}

export default useSocket;
