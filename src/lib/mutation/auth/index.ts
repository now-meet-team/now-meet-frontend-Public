import {useNavigation} from '@react-navigation/native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosError, AxiosResponse} from 'axios';
import {axiosInstance} from 'lib/axiosConfig';
import {LOCATION_PROFILE_QUERY_KEY} from 'lib/query/googlemap';
import {Alert} from 'react-native';
import {useModalStore} from 'store/modal/modalStore';
import {useNavigationStore, useNickNameStore} from 'store/signup/signUpStore';

/** 로그인 **/
export const usePostIsSignIn = () => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const useSignInMutation = useMutation(
    (uuid: string | null): Promise<AxiosResponse> =>
      axiosInstance.post('/auth/isuser', {uuid}),
    {
      onSuccess: async data => {
        const isUserSignIn = data?.data.data;

        if (!isUserSignIn) {
          return navigation.navigate('SignUp' as never);
        }

        queryClient.invalidateQueries({queryKey: [LOCATION_PROFILE_QUERY_KEY]});
        return navigation.navigate('Main' as never);
      },

      onError: (error: AxiosError) => {
        console.error(error.status);
      },
    },
  );

  return {
    useSignInMutation,
  };
};

/** 회원가입  **/
export const usePostSignUp = () => {
  const navigation = useNavigation();
  const handleNickName = useNickNameStore(state => state.handleNickName);
  const resetPageNumber = useNavigationStore(state => state.resetPageNumber);

  const config = {
    headers: {'Content-Type': 'multipart/form-data'},
  };

  const useSignUpMutation = useMutation(
    (formData: FormData): Promise<AxiosResponse> =>
      axiosInstance.post('/users/signup', formData, config),
    {
      onSuccess: () => {
        handleNickName('');
        resetPageNumber();
        navigation.navigate('Main' as never);
      },

      onError: error => {
        Alert.alert(error as string);
      },
    },
  );

  return {
    useSignUpMutation,
  };
};

/** 계정 삭제 회원가입  **/
export const usePostUserDelete = () => {
  const navigation = useNavigation();
  const handleVisible = useModalStore(state => state.handleVisible);

  const useUserDeleteMutation = useMutation(
    (): Promise<AxiosResponse> =>
      axiosInstance.delete('/users/me/delete/account'),
    {
      onSuccess: () => {
        handleVisible(false);
        navigation.reset({
          index: 0,
          routes: [{name: 'Home' as never}],
        });
      },

      onError: error => {
        console.log(error);
      },
    },
  );

  return {
    useUserDeleteMutation,
  };
};

/** Refresh Token 사용(X)**/
export const useGoogleGetRefreshToken = () => {
  const useGetGoogleRefreshTokenMutation = useMutation(
    (serverAuthCode: string): Promise<AxiosResponse> =>
      axiosInstance.post('/auth/getRefreshToken/google', {
        code: serverAuthCode,
      }),
    {
      onSuccess: () => {},

      onError: error => {
        console.log(error);
      },
    },
  );

  return {
    useGetGoogleRefreshTokenMutation,
  };
};
