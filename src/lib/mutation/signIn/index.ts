import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {axiosInstance} from 'lib/axiosConfig';
import {setAuthToken} from 'utils/auth';

export const usePostIsSignIn = () => {
  const navigation = useNavigation();

  const useSignInMutation = useMutation(
    (email: string): Promise<AxiosResponse> =>
      axiosInstance.post('/auth/isuser', {email}),
    {
      onSuccess: data => {
        const isUserSignIn = data?.data.data;
        if (isUserSignIn === null) {
          return navigation.navigate('SignUp' as never);
        }

        setAuthToken(isUserSignIn.token);
        return navigation.navigate('Main' as never);
      },

      onError: error => {
        console.log(error);
      },
    },
  );

  return {
    useSignInMutation,
  };
};
