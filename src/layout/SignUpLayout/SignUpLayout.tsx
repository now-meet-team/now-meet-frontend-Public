import React from 'react';

import styled from 'styled-components/native';
import {
  useNavigationStore,
  useSignUpStore,
} from '../../store/signup/signUpStore';
import {palette} from '../../config/globalStyles';
import Button from '../../components/Common/Button/Button';
import ProgressBar from 'components/ProgressBar';
import {usePostSignUp} from 'services/mutation/auth';
import {useNavigation} from '@react-navigation/native';
import {
  useEditJobProfile,
  useEditMyselfProfile,
  useEditPreferenceProfile,
} from 'services/query/profile';

import {KeyboardAvoidingView, Platform} from 'react-native';

type SignUpLayoutType = {
  mode?: string;
  type?: string;
  title: string;
  subTitle?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

export default function SignUpLayout(props: SignUpLayoutType) {
  const {mode = 'create', type, title, subTitle, children, disabled} = props;

  const pageNumber = useNavigationStore(state => state.pageNumber);
  const nextPage = useNavigationStore(state => state.handleNextPage);

  const handleUserSignUp = useSignUpStore(state => state.handleUserSignUp);

  const {useSignUpMutation} = usePostSignUp();
  const {editJobProfileMutation} = useEditJobProfile();
  const {editMyselfMutation} = useEditMyselfProfile();
  const {editPreferenceMutation} = useEditPreferenceProfile();

  const handleSignUp = () => {
    const formData = handleUserSignUp();

    useSignUpMutation.mutate(formData);
  };

  const handleEditMode = () => {
    switch (type) {
      case 'editJob':
        editJobProfileMutation.mutate();
        break;
      case 'editIntroduction':
        editMyselfMutation.mutate();
        break;
      case 'editPreferences':
        editPreferenceMutation.mutate();
        break;
      default:
        break;
    }
  };

  const handleButtonPress = () => {
    if (mode === 'edit') {
      handleEditMode();
      return;
    }

    if (pageNumber === 9) {
      handleSignUp();
      return;
    }

    nextPage();
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      keyboardVerticalOffset={60}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <SignUpLayoutContainer>
        {mode === 'create' && <ProgressBar />}

        <SignUpText style={{marginTop: mode === 'edit' ? 30 : 0}}>
          {title}
        </SignUpText>

        <SignUpSubText>{subTitle}</SignUpSubText>

        <ViewChildrenStyled>{children}</ViewChildrenStyled>

        <ButtonContainer>
          <Button
            padding="12px 24px"
            disabled={disabled}
            backgroundColor={disabled ? palette.gray : palette.awesome}
            title={pageNumber === 9 || mode === 'edit' ? '완료' : '다음'}
            onPress={handleButtonPress}
          />
        </ButtonContainer>
      </SignUpLayoutContainer>
    </KeyboardAvoidingView>
  );
}

const SignUpLayoutContainer = styled.SafeAreaView`
  flex: 1;
  position: relative;
  background-color: ${palette.white};
`;

const ViewChildrenStyled = styled.View`
  /* padding: 20px; */
`;

const SignUpText = styled.Text`
  font-size: 24px;
  font-weight: 500;
  padding: 0 20px;
  background-color: ${palette.white};
`;

const SignUpSubText = styled.Text`
  font-size: 13px;
  font-weight: 500;
  padding: 0 20px;
  margin-top: 10px;
  background-color: ${palette.white};
`;

export const ButtonContainer = styled.View`
  width: 100%;
  position: absolute;
  bottom: 20px;
  padding: 15px;
`;
