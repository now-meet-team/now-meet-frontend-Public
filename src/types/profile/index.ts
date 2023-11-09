export type ProfileUserType = {
  user: ProfileType;
  PreSignedUrl: string[];
};

export type ProfileType = {
  id: number;
  email: string;
  nickname: string;
  sex: string;
  birthDate: string;
  tall: string;
  job: string;
  introduce: string;
  preference: string[];
  gem: number;
  longitude: string;
  latitude: string;
  profileImages: [string];
  createdAt: string;
};
