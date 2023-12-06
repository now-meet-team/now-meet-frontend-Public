import React from 'react';
import SignUpLayout from 'layout/SignUpLayout/SignUpLayout';
import ImageUploadContainer from 'components/ImageUploadContainer';
import {useImageAndUpload} from 'hooks/useUpload';
import {useImageStore} from 'store/signup/signUpStore';
import {Asset} from 'react-native-image-picker';

export default function UploadImageScreen() {
  const {onUpload} = useImageAndUpload();

  const images: Asset[] = useImageStore(state => state.images);

  return (
    <SignUpLayout title={'이미지를 선택해주세요'}>
      <ImageUploadContainer onUpload={onUpload} initialImages={images} />
    </SignUpLayout>
  );
}
