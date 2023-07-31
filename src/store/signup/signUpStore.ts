import {create} from 'zustand';

type UseNavigationStoreType = {
  pageNumber: number;
  handleNextPage: () => void;
};

export const useNavigationStore = create<UseNavigationStoreType>(set => ({
  pageNumber: 0,
  handleNextPage: () => set(state => ({pageNumber: state.pageNumber + 1})),
}));

type UseNickNameStoreType = {
  nickName: string;
  handleNickName: (text: string) => void;
};

export const useNickNameStore = create<UseNickNameStoreType>(set => ({
  nickName: '',
  handleNickName: (text: string) => set({nickName: text}),
}));

type UseGenderStoreType = {
  selectGender: string;
  handleSelectGender: (value: string) => void;
};

export const useGenderStore = create<UseGenderStoreType>(set => ({
  selectGender: '',
  handleSelectGender: (value: string) => set({selectGender: value}),
}));

type UseJobStoreType = {
  selectJob: string | number;
  handleSelectJob: (value: string | number) => void;
};

export const useJobStore = create<UseJobStoreType>(set => ({
  selectJob: '',
  handleSelectJob: (value: string | number) => set({selectJob: value}),
}));
