import {StyleSheet, Switch, Text, View} from 'react-native';
import React from 'react';
import {palette} from 'config/globalStyles';
import styled from 'styled-components/native';
import {SvgProps} from 'react-native-svg';
import {RightSVG} from '../../assets';

enum SettingLight {
  switch = 'switch',
  arrow = 'arrow',
}

type SettingListType = {
  SvgComponent?: React.FC<SvgProps>;
  label: string;
  mode: SettingLight | string;
  onClick?: () => void;
};

export default function SettingList(props: SettingListType) {
  const {SvgComponent, label, mode, onClick} = props;
  return (
    <ProfileSVGWrapper onPress={onClick}>
      <ProfileSVGTextContainer>
        {SvgComponent && <SvgComponent width={24} />}

        <ProfileSVGText>{label}</ProfileSVGText>
      </ProfileSVGTextContainer>

      {mode === 'switch' && (
        <Switch
          trackColor={{false: palette.beer, true: '#FF224A'}}
          ios_backgroundColor={false ? '#FF224A' : '#f4f3f4'}
          onValueChange={() => {}}
          value={false}
        />
      )}

      {mode === 'arrow' && <RightSVG color={'#000'} />}
    </ProfileSVGWrapper>
  );
}

const ProfileSVGWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const ProfileSVGTextContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ProfileSVGText = styled.Text`
  font-size: 15px;
  font-weight: 500;
  margin-left: 10px;
`;
