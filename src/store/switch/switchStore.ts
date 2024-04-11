import AsyncStorage from '@react-native-async-storage/async-storage';

import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

type UseSwitchStoreType = {
  switching: boolean;
  handleSwitch: (value: boolean) => void;
};

export const useSwitchStore = create(
  persist<UseSwitchStoreType>(
    set => ({
      switching: false,
      handleSwitch: (value: boolean) => {
        set({switching: value});
      },
    }),
    {
      name: 'switchStore',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
