import {Text} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import {palette} from 'config/globalStyles';
import {useProfileMe} from 'lib/query/profile';
import ImageUploadContainer from 'components/ImageUploadContainer';
import {Asset} from 'react-native-image-picker';

import {useImageAndUpload} from 'hooks/useUpload';

export default function EditUserProfile() {
  const {queryProfileData} = useProfileMe();
  const {onUpload, images} = useImageAndUpload();

  const assets: Asset[] = images.map((item, index) => ({
    uri: item.uri || queryProfileData?.PreSignedUrl[index],
  }));

  return (
    <EditContainer>
      <ImageUploadContainer
        type="edit"
        onUpload={onUpload}
        initialImages={assets}
      />

      <EditTextContainer style={{marginTop: 25}}>
        <EditText>닉네임</EditText>
        <Text>{queryProfileData?.user.nickname}</Text>
      </EditTextContainer>
      <EditTextContainer>
        <EditText>생년월일</EditText>
        <Text>ㅁㄴㅇ</Text>
      </EditTextContainer>
      <EditTextContainer>
        <EditText>성별</EditText>
        <Text>{queryProfileData?.user.sex === 'men' ? '남' : '여'}</Text>
      </EditTextContainer>
      <EditTextContainer>
        <EditText>직업</EditText>
        <Text>{queryProfileData?.user.job}</Text>
      </EditTextContainer>
      <EditTextContainer>
        <EditText>키</EditText>
        <Text>{queryProfileData?.user.tall}</Text>
      </EditTextContainer>
      <EditTextContainer>
        <EditText>자기소개</EditText>
        <Text>{queryProfileData?.user.introduce}</Text>
      </EditTextContainer>
      <EditTextContainer>
        <EditText>취향</EditText>
        <Text>{queryProfileData?.user.preference}</Text>
      </EditTextContainer>
    </EditContainer>
  );
}

const EditContainer = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${palette.white};
`;

const EditTextContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-bottom: 25px;
`;

export const EditText = styled.Text`
  color: ${palette.gray};
  font-size: 15px;
`;
