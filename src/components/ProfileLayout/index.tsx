import {Text} from 'react-native';
import React from 'react';
import styled from 'styled-components/native';
import ProfileImage from 'components/ProfileImage';
import {palette} from 'config/globalStyles';

type ProfileLayoutType = {
  uri: string;
  nickname: string;
  subText?: string;
};

export default function ProfileLayout(props: ProfileLayoutType) {
  const {uri, nickname, subText} = props;

  return (
    <ProfileImageWrapper>
      <ProfileImage uri={uri} />

      <ProfileImageInfo>
        <Text>{nickname}</Text>
        <ProfileImageSubText>{subText}</ProfileImageSubText>
      </ProfileImageInfo>
    </ProfileImageWrapper>
  );
}

const ProfileImageWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding-left: 15px;
  padding-top: 12px;

  margin-bottom: 12px;
`;

const ProfileImageInfo = styled.View`
  margin-left: 10px;
`;

const ProfileImageSubText = styled.Text`
  margin-top: 4px;
  color: ${palette.gray};
`;
