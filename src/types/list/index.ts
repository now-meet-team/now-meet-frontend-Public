export type InboxListType = {
  matchId: number;
  isMatch: string;
  senderId: number;
  senderNickname: string;
  expireMatch: string;
  profileImages: {
    ProfileImages: string[];
    PreSignedUrl: string[];
  };
};
