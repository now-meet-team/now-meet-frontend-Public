import {useMutation, useQueryClient} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';
import axiosInstance from 'services/axiosConfig';
import {LOCATION_PROFILE_QUERY_KEY} from 'services/query/googlemap';

/** 고스트 모드  **/
export const useGhost = () => {
  const queryClient = useQueryClient();

  const useUserGhostMutation = useMutation(
    (isGhost: boolean): Promise<AxiosResponse> =>
      axiosInstance.put('/users/ghostMode', {setting: isGhost}),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey: [LOCATION_PROFILE_QUERY_KEY]});
      },

      onError: error => {
        console.log(error);
      },
    },
  );

  return {
    useUserGhostMutation,
  };
};
