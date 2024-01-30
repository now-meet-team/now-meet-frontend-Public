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
