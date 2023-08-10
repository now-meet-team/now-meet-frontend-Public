import {create} from 'zustand';

type UseTermsStoreType = {
  term: boolean;
  privacy: boolean;
  locationCheck: boolean;
  sensitiveCheck: boolean;
  marketingCheck: boolean;
};

/* 페이지 이동 */
export const useTermsStore = create<UseTermsStoreType>((set, get) => ({
  term: false,
  privacy: false,
  locationCheck: false,
  sensitiveCheck: false,
  marketingCheck: false,
}));
