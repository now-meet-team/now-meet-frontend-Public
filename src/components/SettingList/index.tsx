import {Switch, Text} from 'react-native';
import React from 'react';
import {palette} from 'config/globalStyles';
import styled from 'styled-components/native';
import {SvgProps} from 'react-native-svg';
import {RightSVG} from '../../assets';
import {useSwitchStore} from 'store/switch/switchStore';

enum SettingLight {
  switch = 'switch',
  arrow = 'arrow',
}

type SettingListType = {
  SvgComponent?: React.FC<SvgProps>;
  label: string;
  mode: SettingLight | string;
  onClick?: () => void;
  onChange?: (value: boolean) => void;
  text?: string;
};

export default function SettingList(props: SettingListType) {
  const {SvgComponent, label, mode, text, onClick, onChange} = props;

  const switchingValue = useSwitchStore(state => state.switching);

  return (
    <ProfileSVGWrapper onPress={onClick}>
      <ProfileSVGTextContainer>
        {SvgComponent && <SvgComponent width={24} />}

        <ProfileSVGText>{label}</ProfileSVGText>
      </ProfileSVGTextContainer>

      {mode === 'switch' && (
        <Switch
          thumbColor={palette.white}
          trackColor={{false: palette.gray, true: palette.nero}}
          ios_backgroundColor={false ? '#FF224A' : '#f4f3f4'}
          onValueChange={onChange}
          value={switchingValue}
        />
      )}

      {mode === 'arrow' && <RightSVG color={'#000'} />}

      {mode === 'text' && <Text>{text}</Text>}
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
