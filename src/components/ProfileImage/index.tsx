import React from 'react';
import styled from 'styled-components/native';

type ProfileImageType = {
  uri: string;
};

export default function ProfileImage(props: ProfileImageType) {
  return (
    <ProfileImageContainer
      source={{uri: props.uri}}
      alt="nowmeet-profile-image"
    />
  );
}

const ProfileImageContainer = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 50px;

  border-width: 1px;
  border-color: red;
`;
