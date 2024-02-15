import {useQuery} from '@tanstack/react-query';
import {ChatListType, ChatListTypeWithUserData} from 'types/list';
import {handleAxios} from '../profile';
import {useIsFocused} from '@react-navigation/native';

export const CHAT_LIST_QUERY_KEY = 'CHAT_LIST_QUERY_KEY';
export const CHAT_ROOM_QUERY_KEY = 'CHAT_ROOM_QUERY_KEY';

export const useChatList = () => {
  const isFocused = useIsFocused();

  const {data: chatListData, isLoading: chatListLoading} = useQuery<
    ChatListType[]
  >({
    queryKey: [CHAT_LIST_QUERY_KEY],
    enabled: isFocused,

    queryFn: async () => {
      const {data} = await handleAxios('/match/me/chatBox/all');
      return data;
    },
  });

  return {chatListData, chatListLoading};
};

export const useChatRoom = (chatId: number) => {
  const {data: chatRoomData, isLoading: chatRoomLoading} =
    useQuery<ChatListTypeWithUserData>({
      queryKey: [CHAT_ROOM_QUERY_KEY, chatId],

      queryFn: async () => {
        const {data} = await handleAxios(`/match/me/chatBox/${chatId}`);
        return data;
      },
    });

  return {chatRoomData, chatRoomLoading};
};
