/** Liked Message List **/

import {useQuery} from '@tanstack/react-query';
import {AxiosError} from 'axios';
import {axiosInstance} from 'lib/axiosConfig';
import {ProfileUserType} from 'types/profile';

const LIKE_MESSAGE_LIST_QUERY_KEY = 'LIKE_MESSAGE_LIST_QUERY_KEY';
const PROFILE_ME_QUERY_KEY = 'PROFILE_ME_QUERY_KEY';

// const axiosComments = async () => {
//   return await axiosInstance.get('/api/comments');
// };

// // export const useIsSignup = () => {
// //   const {
// //     isLoading: isCommentLoading,
// //     isError: isCommentError,
// //     data: commentState,
// //     isSuccess,
// //   } = useQuery([SIGNIN_QUERY_KEY], () => axiosComments());

// //   return {isCommentLoading, isCommentError, commentState, isSuccess};
// // };

const handleAxios = async (api: string) => {
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
