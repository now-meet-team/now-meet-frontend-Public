import {useQuery} from '@tanstack/react-query';
import {axiosInstance} from 'lib/axiosConfig';

const SIGNIN_QUERY_KEY = 'SIGNINKEY';

const axiosComments = async () => {
  return await axiosInstance.get('/api/comments');
};

export const useIsSignup = () => {
  const {
    isLoading: isCommentLoading,
    isError: isCommentError,
    data: commentState,
    isSuccess,
  } = useQuery([SIGNIN_QUERY_KEY], () => axiosComments());

  return {isCommentLoading, isCommentError, commentState, isSuccess};
};
