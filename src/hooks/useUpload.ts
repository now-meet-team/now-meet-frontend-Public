import {
  useDeleteProfileImage,
  useProfileMe,
  useUpdateProfileImage,
} from 'services/query/profile';
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';

import {useImageStore} from 'store/signup/signUpStore';

const option: ImageLibraryOptions = {
  mediaType: 'photo',
  selectionLimit: 1,
};

export const useImageAndUpload = () => {
  const images = useImageStore(state => state.images);
  const handleOnUpload = useImageStore(state => state.handleOnUpload);
  const getImageFormData = useImageStore(state => state.getImageFormData);

  const {queryProfileData} = useProfileMe();
  const {editProfileImageMutation} = useUpdateProfileImage();
  const {deleteProfileImageMutation} = useDeleteProfileImage();

  const updateImages = (index: number, newImage: Asset) => {
    const newArray = [...images];
    newArray[index] = newImage;
    handleOnUpload(newArray);
  };

  const getFormDataImage = (index: number) => {
    const formImageData = getImageFormData(index);
    return formImageData;
  };

  const mutateImageUpload = async (
    type: string,
    formImage: FormData,
    index: number,
  ) => {
    if (type === 'edit') {
      await editProfileImageMutation.mutate({
        formData: formImage,
        index,
      });
    }
  };

  //이미지 View
  const onGetImage = () => {
    const getImages = (queryProfileData?.PreSignedUrl || []).map(
      (item: string) => ({
        uri: item,
      }),
    );
    return getImages;
  };

  //이미지 삭제
  const onDelete = async (index: number) => {
    await deleteProfileImageMutation.mutateAsync({
      index,
    });
  };

  // 이미지 업로드 처리
  const onUpload = async (type: string, index: number) => {
    const response = await launchImageLibrary(option);

    if (response && response.assets) {
      updateImages(index, response.assets[0]);
      let formImage = getFormDataImage(index);

      mutateImageUpload(type, formImage, index);
    }
  };

  return {images, handleOnUpload, onGetImage, onUpload, onDelete};
};
