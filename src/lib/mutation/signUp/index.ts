import {useMutation} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import {axiosInstance} from 'lib/axiosConfig';

export const usePostSignUp = () => {
  const config = {
    headers: {'Content-Type': 'multipart/form-data'},
  };

  const useSignUpMutation = useMutation(
    (formData: FormData): Promise<AxiosResponse> =>
      axiosInstance.post('/users/signup', formData, config),
    {
      onSuccess: data => {
        console.log('data-->', data);
      },
      onMutate: data => {
        console.log(data);
      },
      onError: error => {
        console.log(error);
      },
    },
  );

  return {
    useSignUpMutation,
  };
};
