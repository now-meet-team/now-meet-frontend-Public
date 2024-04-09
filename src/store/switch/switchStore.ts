import {create} from 'zustand';

type UseSwitchStoreType = {
  switching: boolean;
  handleSwitch: (value: boolean) => void;
};

export const useSwitchStore = create<UseSwitchStoreType>(set => ({
  switching: false,
  handleSwitch: (value: boolean) => {
    set({switching: value});
  },
}));
