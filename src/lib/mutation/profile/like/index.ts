import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {axiosInstance} from 'lib/axiosConfig';

import {PROFILE_DETAIL_QUERY_KEY} from 'lib/query/user';

/** 유저 좋아요  **/
export const useProfileLike = () => {
  const queryClient = useQueryClient();

  const useUserLikeMutation = useMutation(
    (nickname: string): Promise<AxiosResponse> =>
      axiosInstance.post(`/match/profile/${nickname}/like`),
    {
      onSuccess: data => {
        console.log(data);
        queryClient.invalidateQueries({queryKey: [PROFILE_DETAIL_QUERY_KEY]});
      },

      onError: error => {
        console.log(error);
      },
    },
  );

  return {
    useUserLikeMutation,
  };
};
