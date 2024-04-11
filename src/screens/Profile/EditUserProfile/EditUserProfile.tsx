import {Text, View} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import {palette} from 'config/globalStyles';
import {useProfileMe} from 'services/query/profile';
import ImageUploadContainer from 'components/ImageUploadContainer';
import {Asset} from 'react-native-image-picker';

import {useImageAndUpload} from 'hooks/useUpload';

import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
import ProfileEditRowLayout from 'layout/ProfileEditRowLayout/ProfileEditRowLayout';
import {EditSVG} from 'assets';

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
    <ScrollView style={{backgroundColor: '#fff'}}>
      <EditContainer>
        <ImageUploadContainer
          type="edit"
          onUpload={onUpload}
          onDelete={onDelete}
          initialImages={onGetImage() as Asset[]}
        />

        <ProfileEditRowLayout title="닉네임" style={{marginTop: 35}}>
          <Text>{queryProfileData?.user.nickname}</Text>
        </ProfileEditRowLayout>

        <ProfileEditRowLayout title="생년월일">
          <Text>
            {moment(queryProfileData?.user.birthDate)
              .locale('ko')
              .format('YYYY년 MM월 DD일')}
          </Text>
        </ProfileEditRowLayout>

        <ProfileEditRowLayout title="성별">
          <Text>{queryProfileData?.user.sex === 'men' ? '남' : '여'}</Text>
        </ProfileEditRowLayout>

        <ProfileEditRowLayout title="직업">
          <EditTextWrapper>
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
          </EditTextWrapper>
        </ProfileEditRowLayout>

        <ProfileEditRowLayout title="키">
          <Text>{queryProfileData?.user.tall}cm</Text>
        </ProfileEditRowLayout>

        <ProfileEditRowLayout title="자기소개">
          <EditTextWrapper style={{justifyContent: 'flex-end'}}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditIntroduction', {
                  mode: 'edit',
                  type: 'editIntroduction',
                  introduce: queryProfileData?.user.introduce || '',
                })
              }>
              <EditSVG />
            </TouchableOpacity>
          </EditTextWrapper>
        </ProfileEditRowLayout>

        <IntroduceText>{queryProfileData?.user.introduce}</IntroduceText>

        <ProfileEditRowLayout title="취향">
          <EditTextWrapper style={{justifyContent: 'flex-end'}}>
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
          </EditTextWrapper>
        </ProfileEditRowLayout>

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
        </ContentWrapper>
      </EditContainer>
    </ScrollView>
  );
}

const EditContainer = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${palette.white};
`;

const EditTextWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const EditText = styled.Text`
  color: ${palette.gray};
  font-size: 15px;
`;

const IntroduceText = styled.Text`
  margin-bottom: 30px;
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
