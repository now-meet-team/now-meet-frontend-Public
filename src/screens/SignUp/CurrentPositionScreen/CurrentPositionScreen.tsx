import React, {useEffect} from 'react';
import {Linking, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import SignUpLayout from '@layout/SignUpLayout/SignUpLayout';

import GoogleMap from 'components/GoogleMap/GoogleMap';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';

export default function CurrentPositionScreen() {
  return (
    <SignUpLayout
      title={'회원님의 위치를 알려주세요'}
      subTitle="주변의 소중한 인연들을 알려줍니다">
      <GoogleMap />
    </SignUpLayout>
  );
}
