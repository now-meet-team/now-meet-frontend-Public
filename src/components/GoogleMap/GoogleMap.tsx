import React from 'react';
import {Platform, StyleSheet} from 'react-native';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export default function GoogleMap() {
  return (
    <MapView
      showsUserLocation
      scrollEnabled={false}
      toolbarEnabled={false}
      mapType={Platform.OS === 'android' ? 'none' : 'standard'}
      style={styles.map}
      minZoomLevel={14}
      initialRegion={{
        latitude: 37.497386,
        longitude: 127.026596,
        latitudeDelta: 1.795218101812615,
        longitudeDelta: 0.9008869173333,
      }}
    />
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
