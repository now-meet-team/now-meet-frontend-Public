import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

type SkeletonCircleType = {
  width?: number;
  height?: number;
  borderRadius?: number;
};

export default function SkeletonCircle(props: SkeletonCircleType) {
  const {width = 70, height = 70, borderRadius = 50} = props;
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          width={width}
          height={height}
          borderRadius={borderRadius}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
}
