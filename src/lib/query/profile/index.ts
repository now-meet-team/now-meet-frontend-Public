/** Liked Message List **/

import {useQuery} from '@tanstack/react-query';

import {axiosInstance} from 'lib/axiosConfig';
import {ProfileUserType} from 'types/profile';
import {LikedProfileListType} from 'types/profile/likedProfileList';

const LIKE_MESSAGE_LIST_QUERY_KEY = 'LIKE_MESSAGE_LIST_QUERY_KEY';
const PROFILE_ME_QUERY_KEY = 'PROFILE_ME_QUERY_KEY';

export const handleAxios = async (api: string) => {
  try {
    const response = await axiosInstance.get(api);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const useProfileMe = () => {
  const {data: queryProfileData, isLoading: queryProfileLoading} =
    useQuery<ProfileUserType>({
      queryKey: [PROFILE_ME_QUERY_KEY],

      queryFn: async () => {
        const {data} = await handleAxios('/users/me');

        return data;
      },
    });

  return {queryProfileData, queryProfileLoading};
};

export const useLikedMessageList = () => {
  const {data: likedListProfileData, isLoading: queryProfileLoading} = useQuery<
    LikedProfileListType[]
  >({
    queryKey: [LIKE_MESSAGE_LIST_QUERY_KEY],

    queryFn: async () => {
      const {data} = await handleAxios('/match/me/sendBox');
      return data;
    },
  });

  return {likedListProfileData, queryProfileLoading};
};
