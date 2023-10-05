import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Linking, Platform, StyleSheet, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {mapStyle} from './mapStyle';
import {PERMISSIONS, RESULTS, check, request} from 'react-native-permissions';

export default function GoogleMap() {
  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;

        console.log(latitude, longitude);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

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
  }, [showAlert]);

  useEffect(() => {
    requestLocationPermission();
  }, [requestLocationPermission]);

  return (
    <>
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
          latitude: 37.652753,
          longitude: 126.901085,
          latitudeDelta: 1.795218101812615,
          longitudeDelta: 0.9008869173333,
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
