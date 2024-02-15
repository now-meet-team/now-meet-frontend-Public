import {useEffect, useState} from 'react';
import {GestureResponderEvent} from 'react-native';
import {Socket} from 'socket.io-client';
import {io} from 'socket.io-client';

import {retrieveUserSession} from 'utils/auth';

function useSocket(roomId: number) {
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');
  const [socket, setSocket] = useState<Socket | null>(null);

  const sendMessage = async (event: GestureResponderEvent) => {
    event.preventDefault();

    if (socket?.active) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  useEffect(() => {
    let newSocket: Socket;

    const initializeSocket = async () => {
      const getToken = await retrieveUserSession('idToken');

      newSocket = io('http://localhost:8080', {
        auth: {token: getToken},
        query: {
          roomId: roomId,
        },
        transports: ['websocket'],
      });

      newSocket.on('connect', () => {
        console.log(newSocket.id);
      });

      newSocket.on('message', data => {
        setMessages(prev => [...prev, data]);
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
    sendMessage,
    setMessage,
    message,
    socket,
    messages,
    setMessages,
  };
}

export default useSocket;
