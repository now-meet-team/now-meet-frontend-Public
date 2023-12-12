/** Liked Message List **/

import {useNavigation} from '@react-navigation/native';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';

import {axiosInstance} from 'lib/axiosConfig';
import {
  useHobbyStore,
  useJobStore,
  useMySelfStore,
} from 'store/signup/signUpStore';
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
  const {
    data: queryProfileData,
    isLoading: queryProfileLoading,
    refetch: queryProfileRefetch,
  } = useQuery<ProfileUserType>({
    queryKey: [PROFILE_ME_QUERY_KEY],

    queryFn: async () => {
      const {data} = await handleAxios('/users/me');

      return data;
    },
  });

  return {queryProfileData, queryProfileLoading, queryProfileRefetch};
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
      onSuccess: () => {
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

export const useDeleteProfileImage = () => {
  const queryClient = useQueryClient();

  const deleteProfileImageMutation = useMutation(
    ({index}: {index: number}): Promise<AxiosResponse> =>
      axiosInstance.put(`/users/me/delete/profileImage/${index}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: [PROFILE_ME_QUERY_KEY]});
      },

      onError: error => {
        console.log(error);
      },
    },
  );

  return {
    deleteProfileImageMutation,
  };
};

export const useEditJobProfile = () => {
  const queryClient = useQueryClient();
  const selectJob = useJobStore(state => state.selectJob);
  const navigation = useNavigation();

  const editJobProfileMutation = useMutation(
    (): Promise<AxiosResponse> =>
      axiosInstance.put('/users/me/update/job', {job: selectJob}),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: [PROFILE_ME_QUERY_KEY]});
        navigation.goBack();
      },

      onError: error => {
        console.log(error);
      },
    },
  );

  return {
    editJobProfileMutation,
  };
};

export const useEditMyselfProfile = () => {
  const queryClient = useQueryClient();
  const selfValueText = useMySelfStore(state => state.mySelfValue);
  const navigation = useNavigation();

  const editMyselfMutation = useMutation(
    (): Promise<AxiosResponse> =>
      axiosInstance.put('/users/me/update/introduce', {
        introduce: selfValueText,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: [PROFILE_ME_QUERY_KEY]});
        navigation.goBack();
      },

      onError: error => {
        console.log(error);
      },
    },
  );

  return {
    editMyselfMutation,
  };
};

export const useEditPreferenceProfile = () => {
  const queryClient = useQueryClient();
  const preferenceSelectValue = useHobbyStore(state => state.selectHobby);
  const navigation = useNavigation();

  const editPreferenceMutation = useMutation(
    (): Promise<AxiosResponse> =>
      axiosInstance.put('/users/me/update/preference', {
        preference: preferenceSelectValue,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: [PROFILE_ME_QUERY_KEY]});
        navigation.goBack();
      },

      onError: error => {
        console.log(error);
      },
    },
  );

  return {
    editPreferenceMutation,
  };
};
