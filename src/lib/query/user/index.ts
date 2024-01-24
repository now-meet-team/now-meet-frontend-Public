import {useQuery} from '@tanstack/react-query';
import {handleAxios} from '../profile';

import {UserDetailType} from 'types/user';

export const PROFILE_DETAIL_QUERY_KEY = 'PROFILE_DETAIL_QUERY_KEY';

export const useUserDetail = (nickname: string) => {
  const {data: useUserDetailData, isLoading: isUserDetailLoading} =
    useQuery<UserDetailType>({
      queryKey: [PROFILE_DETAIL_QUERY_KEY],

      queryFn: async () => {
        const {data} = await handleAxios(`/match/profile/${nickname}`);

        return data;
      },
    });

  return {useUserDetailData: useUserDetailData, isUserDetailLoading};
};
