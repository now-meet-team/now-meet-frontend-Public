export type LikedProfileListType = {
  matchId: number;
  isMatch: string;
  receiverId: number;
  receiverNickname: string;
  expireMatch: string;
  profileImages: {
    ProfileImages: string[];
    PreSignedUrl: string[];
  };
};
