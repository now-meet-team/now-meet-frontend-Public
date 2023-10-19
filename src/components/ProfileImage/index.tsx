import React from 'react';
import styled from 'styled-components/native';

export default function ProfileImage() {
  return <ProfileImageContainer />;
}

const ProfileImageContainer = styled.View`
  width: 70px;
  height: 70px;
  border-radius: 50px;
  border: 1px solid red;
`;
