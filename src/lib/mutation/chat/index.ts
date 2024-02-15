import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {axiosInstance} from 'lib/axiosConfig';
import {CHAT_ROOM_QUERY_KEY} from 'lib/query/chat';

export const useChatOpen = () => {
  const queryClient = useQueryClient();

  const useChatOpenMutation = useMutation(
    (chatId: number): Promise<AxiosResponse> =>
      axiosInstance.post(`/match/me/chatBox/${chatId}/open`),
    {
      onSuccess: data => {
        queryClient.invalidateQueries({queryKey: [CHAT_ROOM_QUERY_KEY]});
      },

      onError: error => {
        console.log(error);
      },
    },
  );

  return {
    useChatOpenMutation,
  };
};
