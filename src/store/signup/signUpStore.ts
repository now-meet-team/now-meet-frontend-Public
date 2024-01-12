import {Alert} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {create} from 'zustand';

type UseNavigationStoreType = {
  pageNumber: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  resetPageNumber: () => void;
};

/* 페이지 이동 */
export const useNavigationStore = create<UseNavigationStoreType>(
  (set, get) => ({
    pageNumber: 0,
    handleNextPage: () =>
      set(state => ({pageNumber: state.pageNumber + 1, isClick: true})),
    handlePrevPage: () => {
      if (get().pageNumber === 0) {
        return;
      }
      set(state => ({pageNumber: state.pageNumber - 1}));
    },
    resetPageNumber: () => {
      set({pageNumber: 0});
    },
  }),
);

/* 이메일 */
type UseEmailStoreType = {
  email: string;
  handleEmail: (text: string) => void;
};

export const useEmailStore = create<UseEmailStoreType>(set => ({
  email: '',
  handleEmail: (text: string) => set({email: text}),
}));

/* 닉네임 */
type UseNickNameStoreType = {
  nickName: string;
  handleNickName: (text: string) => void;
};

export const useNickNameStore = create<UseNickNameStoreType>(set => ({
  nickName: '',

  handleNickName: (text: string) => {
    set({nickName: text});
  },
}));

/* 생일 */
type UseBirthDateStoreType = {
  birthDate: Date;
  handleBirthDate: (text: Date) => void;
};

export const useBirthDateStore = create<UseBirthDateStoreType>(set => ({
  birthDate: new Date(),
  handleBirthDate: (text: Date) => set({birthDate: text}),
}));

/* 성별 */
type UseGenderStoreType = {
  selectGender: string;
  handleSelectGender: (value: string) => void;
};

export const useGenderStore = create<UseGenderStoreType>(set => ({
  selectGender: 'men',
  handleSelectGender: (value: string) => set({selectGender: value}),
}));

/* 자기위치 */
type UseMapStoreType = {
  latitude: number;
  longitude: number;
  setLocationMapValue: (value: {latitude: number; longitude: number}) => void;
};

export const useGoogleMapStore = create<UseMapStoreType>(set => ({
  latitude: 0,
  longitude: 0,
  setLocationMapValue: value => {
    set({latitude: value.latitude});
    set({longitude: value.longitude});
  },
}));

/* 키 */
type UseHeightStoreType = {
  height: string;
  handleSelectGender: (value: string) => void;
};

export const useHeightStore = create<UseHeightStoreType>(set => ({
  height: '',
  handleSelectGender: (value: string) => {
    if (value[0] === '0') {
      return;
    }
    set({height: value});
  },
}));

/* 직업 */
type UseJobStoreType = {
  selectJob: string | number;
  etcJob: string;
  handleSelectJob: (value: string | number) => void;
  handleEtcJob: (value: string) => void;
};

export const useJobStore = create<UseJobStoreType>(set => ({
  selectJob: '',
  etcJob: '',
  handleSelectJob: (value: string | number) => set({selectJob: value}),
  handleEtcJob: (value: string) => set({etcJob: value}),
}));

/* 자기소개 */
type UseMySelfStoreType = {
  mySelfValue: string;
  handleMySelfValue: (value: string) => void;
};

export const useMySelfStore = create<UseMySelfStoreType>(set => ({
  mySelfValue: '',
  handleMySelfValue: (value: string) => {
    const lines = value.split('\n');

    if (lines.length <= 8) {
      set({mySelfValue: value});
    }
  },
}));

/* 취미 */
type UseHobbyStoreType = {
  selectHobby: Array<string>;
  handleSelectHobby: (value: string) => void;
  handleHobbyReset: () => void;
};

export const useHobbyStore = create<UseHobbyStoreType>((set, get) => ({
  selectHobby: [],

  handleSelectHobby: (chipId: string) => {
    if (get().selectHobby?.includes(chipId)) {
      set({selectHobby: get().selectHobby?.filter(hobby => hobby !== chipId)});
    } else if (get().selectHobby?.length < 3) {
      set({selectHobby: [...get()?.selectHobby, chipId]});
    } else {
      Alert.alert('최대 3개까지 선택 가능합니다');
    }
  },
  handleHobbyReset: () => {
    set({selectHobby: []});
  },
}));

/* 사진 */
type UseFileStoreType = {
  image: string;
  images: Array<Asset>;
  handleOnUpload: (image: Asset[] | undefined) => void;
  getImageFormData: (index: number) => FormData;
};

export const useImageStore = create<UseFileStoreType>((set, get) => ({
  image: '',
  images: ['', '', ''],
  handleOnUpload: (imageURL: Asset[] | undefined) => {
    if (imageURL) {
      set({images: imageURL});
    }
  },
  getImageFormData: (index: number) => {
    const formData = new FormData();

    formData.append('profileImage', {
      uri: get().images[index].uri,
      name: get().images[index].fileName,
      type: get().images[index].type,
    });

    return formData;
  },
}));

type UseUserSignUpType = {
  handleUserSignUp: () => FormData;
};

export const useSignUpStore = create<UseUserSignUpType>(() => ({
  handleUserSignUp: () => {
    const formData = new FormData();

    formData.append('email', useEmailStore.getState().email);
    formData.append('nickname', useNickNameStore.getState().nickName);
    formData.append('sex', useGenderStore.getState().selectGender);
    formData.append(
      'birthDate',
      String(useBirthDateStore.getState().birthDate),
    );
    formData.append('tall', useHeightStore.getState().height);
    formData.append('job', useJobStore.getState().selectJob);
    formData.append('introduce', useMySelfStore.getState().mySelfValue);
    formData.append('preference', useHobbyStore.getState().selectHobby);

    useImageStore.getState().images.map(item => {
      return formData.append('profileImages', {
        uri: item.uri,
        name: item.fileName,
        type: item.type,
      });
    });

    formData.append('latitude', useGoogleMapStore.getState().latitude);
    formData.append('longitude', useGoogleMapStore.getState().longitude);

    return formData;
  },
}));
