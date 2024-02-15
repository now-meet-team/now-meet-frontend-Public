import React from 'react';
import styled from 'styled-components/native';

type ProfileImageType = {
  uri: string;
  width?: number;
  height?: number;
};

export default function ProfileImage(props: ProfileImageType) {
  const {uri, width = 70, height = 70} = props;

  return (
    <ProfileImageContainer
      width={width}
      height={height}
      source={{uri: uri}}
      alt="nowmeet-profile-image"
    />
  );
}

const ProfileImageContainer = styled.Image<{width: number; height: number}>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: 50px;
`;
