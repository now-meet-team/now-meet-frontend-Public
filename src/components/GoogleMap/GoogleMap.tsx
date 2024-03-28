import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
  StyleSheet,
  View,
  PermissionsAndroid,
  AppState,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {mapStyle} from './mapStyle';

import {useGoogleMapStore} from 'store/signup/signUpStore';
import {palette} from 'config/globalStyles';
import {GoogleMapLocationNearProfileType} from 'types/googlemap';

import MarkerUser from 'components/MarkerUser';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from 'navigation/Routes';
// import MapView from 'react-native-map-clustering';
import MapView from 'react-native-maps';

type GoogleMapType = {
  locationProfileData?: GoogleMapLocationNearProfileType | undefined;
  lat: number;
  long: number;
};

export default function GoogleMap(props: GoogleMapType) {
  const {locationProfileData, lat, long} = props;

  const navigation = useNavigation<RootStackNavigationProp>();

  const setLocationMapValue = useGoogleMapStore(
    state => state.setLocationMapValue,
  );

  const showAlert = useCallback(() => {
    Alert.alert(
      '위치 권한이 필요합니다!',
      '앱의 기능을 사용하려면 위치 권한이 필요합니다. 설정으로 이동하여 권한을 허용해주세요.',
      [
        {
          text: '설정으로 이동',
          onPress: () => {
            Linking.openSettings();
          },
        },
      ],
    );
  }, []);

  /** IOS 권한 **/
  const hasPermissionIOS = useCallback(async () => {
    const permission = await Geolocation.requestAuthorization('whenInUse');

    if (permission === 'granted') {
      return true;
    }

    if (permission === 'denied') {
      return showAlert();
    }

    if (permission === 'disabled') {
      Alert.alert(
        'Turn on Location Services to allow to determine your location.',
        '',
        [
          {text: 'Go to Settings', onPress: showAlert},
          {text: "Don't Use Location", onPress: () => {}},
        ],
      );
    }

    return false;
  }, [showAlert]);

  const hasLocationPermission = useCallback(async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      return Linking.openSettings();
    }

    return false;
  }, [hasPermissionIOS]);

  const getCurrentPosition = useCallback(async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    const watchId = await Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;

        setLocationMapValue({
          latitude: latitude,
          longitude: longitude,
        });
      },
      error => {
        console.log(error.code, error.message);
      },
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, [hasLocationPermission, setLocationMapValue]);

  useEffect(() => {
    getCurrentPosition();

    const subscription = AppState.addEventListener(
      'change',
      (nextAppState: string) => {
        if (nextAppState === 'active') {
          getCurrentPosition();
        }
      },
    );

    return () => {
      subscription.remove();
    };
  }, [getCurrentPosition]);

  return (
    <>
      {lat !== 0 && long !== 0 ? (
        <>
          <MapView
            cacheEnabled={Platform.OS === 'ios'}
            zoomEnabled={false}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            customMapStyle={mapStyle}
            showsUserLocation
            scrollEnabled={false}
            toolbarEnabled={false}
            followsUserLocation
            // mapType={Platform.OS === 'android' ? 'none' : 'standard'}

            minZoomLevel={14}
            initialRegion={{
              latitude: lat,
              longitude: long,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
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
