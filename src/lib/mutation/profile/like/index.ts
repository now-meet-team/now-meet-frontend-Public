import {useMutation} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {axiosInstance} from 'lib/axiosConfig';

/** 유저 좋아요  **/
export const useProfileLike = () => {
  const useUserLikeMutation = useMutation(
    (nickname: string): Promise<AxiosResponse> =>
      axiosInstance.post(`/match/profile/${nickname}/like`),
    {
      onSuccess: data => {
        console.log(data);
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
