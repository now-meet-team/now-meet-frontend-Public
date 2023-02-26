import {create} from 'zustand';

type UseNavigationStoreType = {
  pageNumber: number;
  handleNextPage: () => void;
};

export const useNavigationStore = create<UseNavigationStoreType>(set => ({
  pageNumber: 0,
  handleNextPage: () => set(state => ({pageNumber: state.pageNumber + 1})),
}));
