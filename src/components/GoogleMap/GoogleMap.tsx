import React, {useCallback, useEffect, useState} from 'react';
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

export default function GoogleMap() {
  const setLocationMapValue = useGoogleMapStore(
    state => state.setLocationMapValue,
  );

  const lat = useGoogleMapStore(state => state.latitude);
  const long = useGoogleMapStore(state => state.longitude);

  const getCurrentPosition = useCallback(async () => {
    await Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;

        console.log('position.coords-->>', position.coords);

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

  return (
    <>
      {lat !== 0 && long !== 0 ? (
        <MapView
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
          }}
        />
      ) : (
        <ActivityIndicator size="large" color={palette.awesome} />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
