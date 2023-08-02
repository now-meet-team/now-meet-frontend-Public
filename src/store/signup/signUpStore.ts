import {Alert} from 'react-native';
import {create} from 'zustand';

type UseNavigationStoreType = {
  pageNumber: number;
  handleNextPage: () => void;
};

/* 페이지 이동 */
export const useNavigationStore = create<UseNavigationStoreType>(set => ({
  pageNumber: 0,
  handleNextPage: () => set(state => ({pageNumber: state.pageNumber + 1})),
}));

/* 닉네임 */
type UseNickNameStoreType = {
  nickName: string;
  handleNickName: (text: string) => void;
};

export const useNickNameStore = create<UseNickNameStoreType>(set => ({
  nickName: '',
  handleNickName: (text: string) => set({nickName: text}),
}));

/* 성별 */
type UseGenderStoreType = {
  selectGender: string;
  handleSelectGender: (value: string) => void;
};

export const useGenderStore = create<UseGenderStoreType>(set => ({
  selectGender: '',
  handleSelectGender: (value: string) => set({selectGender: value}),
}));

/* 직업 */
type UseJobStoreType = {
  selectJob: string | number;
  handleSelectJob: (value: string | number) => void;
};

export const useJobStore = create<UseJobStoreType>(set => ({
  selectJob: '',
  handleSelectJob: (value: string | number) => set({selectJob: value}),
}));

/* 자기소개 */
type UseMySelfStoreType = {
  mySelfValue: string;
  handleMySelfValue: (value: string) => void;
};

export const useMySelfStore = create<UseMySelfStoreType>(set => ({
  mySelfValue: '',
  handleMySelfValue: (value: string) => set({mySelfValue: value}),
}));

/* 취미 */
type UseHobbyStoreType = {
  selectHobby: Array<string>;
  handleSelectHobby: (value: string) => void;
};

export const useHobbyStore = create<UseHobbyStoreType>((set, get) => ({
  selectHobby: [],
  handleSelectHobby: (chipId: string) => {
    if (get().selectHobby.includes(chipId)) {
      set({selectHobby: get().selectHobby.filter(hobby => hobby !== chipId)});
    } else if (get().selectHobby.length < 3) {
      set({selectHobby: [...get().selectHobby, chipId]});
    } else {
      Alert.alert('최대 3개까지 선택 가능합니다');
    }
  },
}));
