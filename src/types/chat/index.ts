export const ChatStatus = {
  PENDING: 'PENDING',
  OPEN: 'OPEN',
  SENDER_EXIT: 'SENDER_EXIT',
  RECEIVER_EXIT: 'RECEIVER_EXIT',
};

export type ResponseMessageType = {
  socketId: string;
  chatRoomId: number;
  content: string;
  id: number;
  senderId: number;
  senderNickname: string;
  type: string;
  createdAt: string;
};

export type DataMessageType = {
  message: ResponseMessageType;
};
