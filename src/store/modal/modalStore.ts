import {create} from 'zustand';

type UseModalType = {
  visible: boolean;
  handleVisible: (show: boolean) => void;
};

export const useModalStore = create<UseModalType>((set, get) => ({
  visible: false,
  handleVisible: (show: boolean) => {
    set({visible: show});
  },
}));
