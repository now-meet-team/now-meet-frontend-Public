import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';

import {PROFILE_DETAIL_QUERY_KEY} from 'services/query/user';

import {usePushNotification} from 'services/mutation/pushNotification';
import axiosInstance from 'services/axiosConfig';

/** 유저 좋아요  **/
export const useProfileLike = () => {
  const queryClient = useQueryClient();

  const {usePushNotificationMutation} = usePushNotification();

  const useUserLikeMutation = useMutation(
    (nickname: string): Promise<AxiosResponse> =>
      axiosInstance.post(`/match/profile/${nickname}/like`),
    {
      onSuccess: data => {
        queryClient.invalidateQueries({queryKey: [PROFILE_DETAIL_QUERY_KEY]});

        usePushNotificationMutation.mutate({
          screenName: 'Inbox',
          title: 'NOWMEET',
          message: `${data?.data.data.myNickname}님이 좋아요를 보냈습니다.`,
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
