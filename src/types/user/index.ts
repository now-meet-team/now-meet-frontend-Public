export type UserDetailType = {
  PreSignedUrl: string[];
  matchStatus: string | null;
  user: {
    nickname: string;
    sex: string;
    birthDate: string;
    tall: string;
    job: string;
    introduce: string;
    preference: string[];
    longitude: string;
    latitude: string;
    profileImages: string[];
  };
};
