import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';

import {PROFILE_DETAIL_QUERY_KEY} from 'lib/query/user';

import {usePushNotification} from 'lib/mutation/pushNotification';
import axiosInstance from 'lib/axiosConfig';

/** 유저 좋아요  **/
export const useProfileLike = () => {
  const queryClient = useQueryClient();

  const {usePushNotificationMutation} = usePushNotification();

  const useUserLikeMutation = useMutation(
    (nickname: string): Promise<AxiosResponse> =>
      axiosInstance.post(`/match/profile/${nickname}/like`),
    {
      onSuccess: data => {
        console.log(data);
        queryClient.invalidateQueries({queryKey: [PROFILE_DETAIL_QUERY_KEY]});

        usePushNotificationMutation.mutate({
          screenName: 'Inbox',
          title: 'NOWMEET',
          message: `${data?.data.data.receiverNickname}님이 좋아요를 보냈습니다.`,
          nickname: data?.data.data.receiverNickname,
        });
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
