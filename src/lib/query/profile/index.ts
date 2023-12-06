/** Liked Message List **/

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';

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

//PUT 내 프로필 사진 추가 및 수정 /users/me/update/profileImage/{index}

export const useUpdateProfileImage = () => {
  const queryClient = useQueryClient();

  const config = {
    headers: {'Content-Type': 'multipart/form-data'},
  };

  const editProfileImageMutation = useMutation(
    ({
      formData,
      index,
    }: {
      formData: FormData;
      index: number;
    }): Promise<AxiosResponse> =>
      axiosInstance.put(
        `/users/me/update/profileImage/${index}`,
        formData,
        config,
      ),
    {
      onSuccess: data => {
        queryClient.invalidateQueries({queryKey: [PROFILE_ME_QUERY_KEY]});
      },

      onError: error => {
        console.log(error);
      },
    },
  );

  return {
    editProfileImageMutation,
  };
};
