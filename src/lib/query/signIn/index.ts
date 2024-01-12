import {useQuery} from '@tanstack/react-query';
import {axiosInstance} from 'lib/axiosConfig';
import React from 'react';
import {useNavigationStore, useNickNameStore} from 'store/signup/signUpStore';

const SIGNIN_QUERY_KEY = 'SIGNINKEY';
const NICK_NAME_DUPLICATION_KEY = 'NICK_NAME_DUPLICATION_KEY';

export const getAxiosRequest = async (url: string) => {
  return await axiosInstance.get(url);
};

export const useIsSignup = () => {
  const {
    isLoading: isCommentLoading,
    isError: isCommentError,
    data: commentState,
    isSuccess,
  } = useQuery([SIGNIN_QUERY_KEY], () => getAxiosRequest('/api/comments'));

  return {isCommentLoading, isCommentError, commentState, isSuccess};
};

export const useNickNameDuplication = (nickName: string) => {
  const {
    isLoading: isNicknameDuplicationLoading,
    data: nicknameDuplication,
    refetch,
  } = useQuery([NICK_NAME_DUPLICATION_KEY, nickName], () =>
    getAxiosRequest(`/users/signup/nickname/${nickName}`),
  );

  return {
    nicknameDuplication: nicknameDuplication,
    isNicknameDuplicationLoading,
    refetch,
  };
};
