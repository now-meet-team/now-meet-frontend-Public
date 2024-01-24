import {useQuery} from '@tanstack/react-query';
import {handleAxios} from '../profile';
import {InboxListType} from 'types/list';

export const LIKE_INBOX_LIST_QUERY_KEY = 'LIKE_INBOX_LIST_QUERY_KEY';

//요청함 리스트
export const useInBoxList = () => {
  const {data: inboxListData, isLoading: isInboxListDataLoading} = useQuery<
    InboxListType[]
  >({
    queryKey: [LIKE_INBOX_LIST_QUERY_KEY],

    queryFn: async () => {
      const {data} = await handleAxios('/match/me/receiveBox');
      return data;
    },
  });
  return {inboxListData, isInboxListDataLoading};
};
