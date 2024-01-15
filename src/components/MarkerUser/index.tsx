import React from 'react';
import {MarkerSVG} from '../../assets';
import {Image, StyleSheet, View} from 'react-native';

type MarkerUserType = {
  preSignedUrl: string;
};

export default function MarkerUser(props: MarkerUserType) {
  const {preSignedUrl} = props;
  return (
    <View style={styles.container}>
      <MarkerSVG />
      <Image
        source={{
          uri: preSignedUrl,
        }}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
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
