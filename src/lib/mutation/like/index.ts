import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {axiosInstance} from 'lib/axiosConfig';
import {LIKE_INBOX_LIST_QUERY_KEY} from 'lib/query/like';

/** POST
/match/me/reciveBox/{matchId}/accept  **/
export const useUserAccept = () => {
  const queryClient = useQueryClient();

  const useUserAcceptMutation = useMutation(
    (matchId: number): Promise<AxiosResponse> =>
      axiosInstance.post(`/match/me/receiveBox/${matchId}/accept`),
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
