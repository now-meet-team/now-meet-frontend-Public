import React, {useEffect} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {mapStyle} from './mapStyle';

export default function GoogleMap() {
  useEffect(() => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('always');
    }
  }, []);

  useEffect(() => {
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
  }, []);

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
