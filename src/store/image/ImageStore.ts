import {create} from 'zustand';

type UseImageType = {
  loading: boolean;

  onSuccessImage: () => void;
};

export const useImageStore = create<UseImageType>(set => ({
  loading: true,

  onSuccessImage: () => {
    set({loading: false});
  },
}));
