export const ChatStatus = {
  PENDING: 'PENDING',
  OPEN: 'OPEN',
  SENDER_EXIT: 'SENDER_EXIT',
};
export type ResponseMessageType = {
  chatRoomId: number;
  content: string;
  id: number;
  senderId: number;
  senderNickname: string;
};
