import {create} from 'zustand';

type UseModalType = {
  visible: boolean;
  likeModalVisible: boolean;
  handleVisible: (show: boolean) => void;
  handleSetTimeoutVisible: () => void;
};

export const useModalStore = create<UseModalType>(set => ({
  visible: false,
  likeModalVisible: false,
  handleVisible: (show: boolean) => {
    set({visible: show});
  },
  handleSetTimeoutVisible: () => {
    setTimeout(() => {
      set({visible: false, likeModalVisible: false});
    }, 1500);
  },
}));
