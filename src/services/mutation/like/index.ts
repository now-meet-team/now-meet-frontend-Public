import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';

import {LIKE_INBOX_LIST_QUERY_KEY} from 'services/query/like';
import {usePushNotification} from '../pushNotification';

import axiosInstance from 'services/axiosConfig';

/** POST
/match/me/reciveBox/{matchId}/accept  **/
export const useUserAccept = () => {
  const queryClient = useQueryClient();

  const {usePushNotificationMutation} = usePushNotification();

  const useUserAcceptMutation = useMutation(
    (matchId: number): Promise<AxiosResponse> =>
      axiosInstance.post(`/match/me/receiveBox/${matchId}/accept`),
    {
      onSuccess: data => {
        queryClient.invalidateQueries({queryKey: [LIKE_INBOX_LIST_QUERY_KEY]});

        usePushNotificationMutation.mutate({
          screenName: 'ChatList',
          title: 'NOWMEET',
          message: `${data?.data.data?.match.senderNickname}님과 매칭이 되었습니다. 대화를 시작해보세요!`,
          nickname: data?.data.data?.match.senderNickname,
        });
      },

      onError: error => {
        console.log(error);
      },
    },
  );

  return {
    useUserAcceptMutation,
  };
};

/** 유저 거절  **/
export const useUserReject = () => {
  const queryClient = useQueryClient();

  const useUserRejectMutation = useMutation(
    (matchId: number): Promise<AxiosResponse> =>
      axiosInstance.post(`/match/me/receiveBox/${matchId}/reject`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: [LIKE_INBOX_LIST_QUERY_KEY]});
      },

      onError: error => {
        console.log(error);
      },
    },
  );

  return {
    useUserRejectMutation,
  };
};
