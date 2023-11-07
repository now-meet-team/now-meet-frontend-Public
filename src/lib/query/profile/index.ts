/** Liked Message List **/

import {axiosInstance} from 'lib/axiosConfig';

const LIKE_MESSAGE_LIST_QUERY_KEY = 'LIKE_MESSAGE_LIST_QUERY_KEY';

const axiosComments = async () => {
  return await axiosInstance.get('/api/comments');
};

// export const useIsSignup = () => {
//   const {
//     isLoading: isCommentLoading,
//     isError: isCommentError,
//     data: commentState,
//     isSuccess,
//   } = useQuery([SIGNIN_QUERY_KEY], () => axiosComments());

//   return {isCommentLoading, isCommentError, commentState, isSuccess};
// };
