import React, {useCallback, useEffect} from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {mapStyle} from './mapStyle';

import {useGoogleMapStore} from 'store/signup/signUpStore';
import {palette} from 'config/globalStyles';
import {GoogleMapLocationNearProfileType} from 'types/googlemap';

import MarkerUser from 'components/MarkerUser';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from 'navigation/Routes';

type GoogleMapType = {
  locationProfileData?: GoogleMapLocationNearProfileType | undefined;
};

export default function GoogleMap(props: GoogleMapType) {
  const {locationProfileData} = props;

  const navigation = useNavigation<RootStackNavigationProp>();

  const setLocationMapValue = useGoogleMapStore(
    state => state.setLocationMapValue,
  );

  const lat = useGoogleMapStore(state => state.latitude);
  const long = useGoogleMapStore(state => state.longitude);

  const getCurrentPosition = useCallback(async () => {
    await Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;

        console.log(latitude, longitude);

        setLocationMapValue({latitude: latitude, longitude: longitude});
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, [setLocationMapValue]);

  const showAlert = useCallback(() => {
    Linking.openSettings();
    Alert.alert(
      '위치 권한이 필요합니다!',
      '앱의 기능을 사용하려면 위치 권한이 필요합니다. 설정으로 이동하여 권한을 허용해주세요.',
      [
        {
          text: '설정으로 이동',
          onPress: () => {
            Linking.openSettings().then(() => {
              requestLocationPermission();
            });
          },
        },
      ],
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestLocationPermission = useCallback(async () => {
    if (Platform.OS === 'ios') {
      const permission = await Geolocation.requestAuthorization('whenInUse');

      if (permission === 'denied') {
        showAlert();
      }

      if (permission === 'granted') {
        getCurrentPosition();
      }
    }
  }, [showAlert, getCurrentPosition]);

  useEffect(() => {
    requestLocationPermission();
  }, [requestLocationPermission]);

  console.log('lat', lat);
  console.log('long', long);

  return (
    <>
      {lat !== 0 && long !== 0 ? (
        <>
          <MapView
            zoomEnabled={false}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            customMapStyle={mapStyle}
            showsUserLocation
            scrollEnabled={false}
            toolbarEnabled={false}
            mapType={Platform.OS === 'android' ? 'none' : 'standard'}
            minZoomLevel={14}
            initialRegion={{
              latitude: lat,
              longitude: long,
              latitudeDelta: 1.795218101812615,
              longitudeDelta: 0.9008869173333,
            }}>
            {locationProfileData &&
              locationProfileData?.nearbyUsers.map(item => {
                return (
                  <Marker
                    key={item.nickname}
                    onPress={() => {
                      navigation.navigate('UserDetail', {
                        nickname: item.nickname,
                      });
                    }}
                    coordinate={{
                      latitude: Number(item.latitude),
                      longitude: Number(item.longitude),
                    }}>
                    <MarkerUser preSignedUrl={item.PreSignedUrl[0]} />
                  </Marker>
                );
              })}
          </MapView>
        </>
      ) : (
        <View style={styles.Loading}>
          <ActivityIndicator size="large" color={palette.awesome} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  Loading: {
    height: '100%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },

  markerTail: {
    position: 'absolute',
    bottom: 0,
    left: '20%',
    transform: [{translateX: -10}],
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderWidth: 0,
    borderTopWidth: 20, // 꼬리의 크기를 조절합니다

    backgroundColor: 'red',
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    position: 'absolute',
    left: '15%',
    right: 0,
    bottom: 0,
    top: '15%',
  },
});
