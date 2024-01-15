import {Text} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import {palette} from 'config/globalStyles';
import {useProfileMe} from 'lib/query/profile';
import ImageUploadContainer from 'components/ImageUploadContainer';
import {Asset} from 'react-native-image-picker';

import {useImageAndUpload} from 'hooks/useUpload';
import EditSVG from '../../../assets/svg/Edit.svg';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

type ParamListType = {
  EditJob: {mode: string; type: string; job: string};
  EditIntroduction: {mode: string; type: string; introduce: string};
  EditPreference: {mode: string; type: string; preference: string[]};
};

export default function EditUserProfile() {
  const navigation = useNavigation<NavigationProp<ParamListType>>();

  const {queryProfileData} = useProfileMe();
  const {onGetImage, onUpload, onDelete} = useImageAndUpload();

  return (
    <ScrollView>
      <EditContainer>
        <ImageUploadContainer
          type="edit"
          onUpload={onUpload}
          onDelete={onDelete}
          initialImages={onGetImage() as Asset[]}
        />

        <EditTextContainer style={{marginTop: 25}}>
          <EditText>닉네임</EditText>
          <Text>{queryProfileData?.user.nickname}</Text>
        </EditTextContainer>
        <EditTextContainer>
          <EditText>생년월일</EditText>
          <Text>{queryProfileData?.user.birthDate}</Text>
        </EditTextContainer>
        <EditTextContainer>
          <EditText>성별</EditText>
          <Text>{queryProfileData?.user.sex === 'men' ? '남' : '여'}</Text>
        </EditTextContainer>
        <EditTextContainer>
          <EditText>직업</EditText>

          <EditBox>
            <Text>{queryProfileData?.user.job}</Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditJob', {
                  mode: 'edit',
                  type: 'editJob',
                  job: queryProfileData?.user.job || '',
                })
              }>
              <EditSVG />
            </TouchableOpacity>
          </EditBox>
        </EditTextContainer>
        <EditTextContainer>
          <EditText>키</EditText>
          <Text>{queryProfileData?.user.tall}</Text>
        </EditTextContainer>
        <EditTextContainer>
          <EditText>자기소개</EditText>
          <EditBox>
            <Text>{queryProfileData?.user.introduce}</Text>
            <TouchableOpacity
              style={{paddingLeft: 20}}
              onPress={() =>
                navigation.navigate('EditIntroduction', {
                  mode: 'edit',
                  type: 'editIntroduction',
                  introduce: queryProfileData?.user.introduce || '',
                })
              }>
              <EditSVG />
            </TouchableOpacity>
          </EditBox>
        </EditTextContainer>
        <EditColumContainer>
          <EditText>취향</EditText>

          <ContentWrapper>
            <PreferenceChipContainer>
              {queryProfileData?.user.preference.map(item => {
                return (
                  <MyProfilePreferenceChip key={item}>
                    {item}
                  </MyProfilePreferenceChip>
                );
              })}
            </PreferenceChipContainer>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditPreference', {
                  mode: 'edit',
                  type: 'editPreferences',
                  preference: queryProfileData?.user.preference || [],
                })
              }>
              <EditSVG />
            </TouchableOpacity>
          </ContentWrapper>
        </EditColumContainer>
      </EditContainer>
    </ScrollView>
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

const EditColumContainer = styled.View`
  display: flex;
  flex-direction: column;

  gap: 20px;
`;

export const EditText = styled.Text`
  color: ${palette.gray};
  font-size: 15px;
`;

const EditBox = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

const ContentWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const PreferenceChipContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;

const MyProfilePreferenceChip = styled.Text`
  border-width: 1;
  border-radius: 16px;

  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 12px;
  padding-right: 12px;
`;
