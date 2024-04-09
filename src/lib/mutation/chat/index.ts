import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import axiosInstance from 'lib/axiosConfig';

import {CHAT_ROOM_QUERY_KEY} from 'lib/query/chat';
import {RootStackNavigationProp} from 'navigation/Routes';
import {useModalStore} from 'store/modal/modalStore';

export const useChatOpen = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<RootStackNavigationProp>();

  const useChatOpenMutation = useMutation(
    (chatId: number): Promise<AxiosResponse> =>
      axiosInstance.post(`/match/me/chatBox/${chatId}/open`),
    {
      onSuccess: data => {
        queryClient.invalidateQueries({queryKey: [CHAT_ROOM_QUERY_KEY]});
      },

      onError: error => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
        console.log(error);
      },
    },
  );

  return {
    useChatOpenMutation,
  };
};

//채팅방 나가기
export const useChatExit = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation<RootStackNavigationProp>();

  const useChatExitMutation = useMutation(
    (chatId: number): Promise<AxiosResponse> =>
      axiosInstance.put(`/match/me/chatBox/${chatId}/exit`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: [CHAT_ROOM_QUERY_KEY]});
        navigation.navigate('ChatList');
        useModalStore.setState({visible: false});
      },

      onError: error => {
        console.log(error);
      },
    },
  );

  return {
    useChatExitMutation,
  };
};

//채팅방 삭제
export const useChatDelete = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const useChatDeleteMutation = useMutation(
    (chatId: number): Promise<AxiosResponse> =>
      axiosInstance.delete(`/match/me/chatBox/${chatId}/delete`),
    {
      onSuccess: () => {
        navigation.navigate('ChatList');
        useModalStore.setState({visible: false});
      },

      onError: error => {
        console.log(error);
      },
    },
  );

  return {
    useChatDeleteMutation,
  };
};
