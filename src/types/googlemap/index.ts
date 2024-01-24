export type GoogleMapLocationNearProfileType = {
  myId: number;
  myLongitude: number;
  myLatitude: number;
  nearbyUsers: NearbyUsersType[];
};

export type NearbyUsersType = {
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
  PreSignedUrl: string[];
  matchStatus: string | null;
};
