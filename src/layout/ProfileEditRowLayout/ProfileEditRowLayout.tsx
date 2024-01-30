import {StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import {palette} from 'config/globalStyles';
import styled from 'styled-components/native';

type ProfileEditRowLayoutType = {
  title: string;
  content?: string;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function ProfileEditRowLayout(props: ProfileEditRowLayoutType) {
  const {title, children, style} = props;
  return (
    <EditTextContainer style={style}>
      <EditTextWrapper>
        <EditText>{title}</EditText>
      </EditTextWrapper>

      <EditContentWrapper>{children}</EditContentWrapper>
    </EditTextContainer>
  );
}

const EditTextContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 25px;
`;

const EditTextWrapper = styled.View`
  flex: 0.3;
  display: flex;
  flex-direction: row;
`;

const EditContentWrapper = styled.View`
  flex: 0.7;
  display: flex;
  flex-direction: row;
`;

export const EditText = styled.Text`
  color: ${palette.gray};
  font-size: 15px;
`;
