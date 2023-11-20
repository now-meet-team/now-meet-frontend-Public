import {useQuery} from '@tanstack/react-query';
import {handleAxios} from '../profile';
import {useGoogleMapStore} from 'store/signup/signUpStore';
import {GoogleMapLocationNearProfileType} from 'types/googlemap';

const LOCATION_PROFILE_QUERY_KEY = 'LOCATION_PROFILE_QUERY_KEY';

export const useLocationProfile = () => {
  const lat = useGoogleMapStore(state => state.latitude);
  const long = useGoogleMapStore(state => state.longitude);

  const {data: locationProfileData, isLoading: locationProfileLoading} =
    useQuery<GoogleMapLocationNearProfileType>({
      queryKey: [LOCATION_PROFILE_QUERY_KEY, lat, long],
      refetchInterval: 15 * 60 * 1000,

      queryFn: async () => {
        const {data} = await handleAxios(`/users/location/${long}/${lat}`);

        return data;
      },
    });

  return {locationProfileData, locationProfileLoading};
};
