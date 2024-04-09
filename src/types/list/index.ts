import {ResponseMessageType} from 'types/chat';

export type InboxListType = {
  matchId: number;
  matchStatus: string;
  senderId: number;
  senderNickname: string;
  expireMatch: string;
  profileImages: {
    ProfileImages: string[];
    PreSignedUrl: string[];
  };
};

export type MessageType = {
  content: string;
  createdAt: string;
  id: number;
};

export type ChatListType = {
  chatId: number;
  matchId: number;
  me: number;
  matchUserId: number;
  matchUserNickname: string;
  chatStatus: string;
  preSignedUrl: Array<string>;
  message: Array<ResponseMessageType>;
  chatUserNickname: string;
  lastMessage: string;
  myNickname: string;
};

export type ChatListTypeWithUserData = {
  chatUserData: ChatListType;
  chatTime: string;
};
