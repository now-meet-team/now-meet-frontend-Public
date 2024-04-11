import {useQuery} from '@tanstack/react-query';
import {handleAxios} from '../profile';

import {GoogleMapLocationNearProfileType} from 'types/googlemap';
import {retrieveUserSession} from 'utils/auth';

export const LOCATION_PROFILE_QUERY_KEY = 'LOCATION_PROFILE_QUERY_KEY';

export const useLocationProfile = (lat: number, long: number) => {
  const {
    data: locationProfileData,
    isLoading: locationProfileLoading,
    refetch: locationMapRefetch,
  } = useQuery<GoogleMapLocationNearProfileType>({
    queryKey: [LOCATION_PROFILE_QUERY_KEY, lat, long],

    refetchInterval: 15 * 60 * 1000,

    queryFn: async () => {
      const fcmToken = await retrieveUserSession('fcmToken');

      const {data} = await handleAxios(`/users/location/${long}/${lat}`, {
        headers: {
          fcmToken: fcmToken,
        },
      });

      return data;
    },

    enabled: lat !== 0 && long !== 0,
  });

  return {locationProfileData, locationProfileLoading, locationMapRefetch};
};
