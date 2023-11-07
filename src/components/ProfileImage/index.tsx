import React from 'react';
import styled from 'styled-components/native';

export default function ProfileImage() {
  return (
    <ProfileImageContainer source={{uri: 'asd'}} alt="nowmeet-profile-image" />
  );
}

const ProfileImageContainer = styled.Image`
  width: 70px;
  height: 70px;
  border-radius: 50px;

  border-width: 1px;
  border-color: red;
`;
