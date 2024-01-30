export type LikedProfileListType = {
  matchId: number;
  matchStatus: string;
  receiverId: number;
  receiverNickname: string;
  expireMatch: string;
  profileImages: {
    ProfileImages: string[];
    PreSignedUrl: string[];
  };
};
