import React from 'react';
import SignUpLayout from 'layout/SignUpLayout/SignUpLayout';
import ImageUploadContainer from 'components/ImageUploadContainer';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';

import {useImageStore} from 'store/signup/signUpStore';

const option: ImageLibraryOptions = {
  mediaType: 'photo',
  selectionLimit: 1,
};

export default function UploadImageScreen() {
  const images = useImageStore(state => state.images);
  const handleOnUpload = useImageStore(state => state.handleOnUpload);

  const onUpload = async (index: number) => {
    const response = await launchImageLibrary(option);

    if (response && response.assets) {
      const newArray = [...images];
      newArray[index] = response.assets[0];
      handleOnUpload(newArray);
    }
  };

  return (
    <SignUpLayout title={'이미지를 선택해주세요'}>
      <ImageUploadContainer onUpload={onUpload} />
    </SignUpLayout>
  );
}
