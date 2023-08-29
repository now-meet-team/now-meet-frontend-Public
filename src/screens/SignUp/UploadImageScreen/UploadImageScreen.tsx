import React from 'react';
import SignUpLayout from 'layout/SignUpLayout/SignUpLayout';
import ImageUploadContainer from 'components/ImageUploadContainer';

export default function UploadImageScreen() {
  return (
    <SignUpLayout title={'이미지를 선택해주세요'}>
      <ImageUploadContainer />
    </SignUpLayout>
  );
}
