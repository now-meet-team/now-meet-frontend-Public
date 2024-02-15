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

type MessageType = {
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
  message: Array<MessageType>;

  chatUserNickname: string;

  disconnectTime: string;
  lastMessage: string;
};

export type ChatListTypeWithUserData = {
  chatUserData: ChatListType;
  disconnectTime: string;
};
