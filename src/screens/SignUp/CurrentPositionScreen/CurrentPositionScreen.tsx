import React from 'react';
import SignUpLayout from '@layout/SignUpLayout/SignUpLayout';

import GoogleMap from 'components/GoogleMap/GoogleMap';

import styled from 'styled-components/native';

export default function CurrentPositionScreen() {
  return (
    <SignUpLayout
      title={'회원님의 위치를 알려주세요'}
      subTitle="주변의 소중한 인연들을 알려줍니다">
      <GoogleMapWrapper>
        <GoogleMap />
      </GoogleMapWrapper>
    </SignUpLayout>
  );
}

export const GoogleMapWrapper = styled.View`
  margin-top: 25px;
  margin-bottom: 150px;
`;
