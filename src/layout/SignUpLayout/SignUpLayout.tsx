import React from 'react';

import styled from 'styled-components/native';
import {
  useNavigationStore,
  useSignUpStore,
} from '../../store/signup/signUpStore';
import {palette} from '../../config/globalStyles';
import Button from '../../components/Common/Button/Button';
import ProgressBar from 'components/ProgressBar';
import {usePostSignUp} from 'lib/mutation/signUp';

type SignUpLayoutType = {
  title: string;
  subTitle?: string;
  children?: React.ReactNode;
  disabled?: boolean;
};

export default function SignUpLayout(props: SignUpLayoutType) {
  const {title, subTitle, children, disabled} = props;

  const pageNumber = useNavigationStore(state => state.pageNumber);
  const nextPage = useNavigationStore(state => state.handleNextPage);

  const handleUserSignUp = useSignUpStore(state => state.handleUserSignUp);

  const {useSignUpMutation} = usePostSignUp();

  const finalSignUp = () => {
    const formData = handleUserSignUp();
    useSignUpMutation.mutate(formData);
  };

  return (
    <SignUpLayoutContainer>
      <ProgressBar />
      <SignUpText>{title}</SignUpText>
      <SignUpSubText>{subTitle}</SignUpSubText>
      <ViewChildrenStyled>{children}</ViewChildrenStyled>
      <ButtonContainer>
        <Button
          disabled={disabled}
          backgroundColor={disabled ? palette.gray : palette.awesome}
          title={pageNumber === 9 ? '완료' : '다음'}
          onPress={pageNumber === 9 ? finalSignUp : nextPage}
        />
      </ButtonContainer>
    </SignUpLayoutContainer>
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

const ButtonContainer = styled.View`
  width: 100%;
  position: absolute;
  bottom: 20px;
  padding: 15px;
`;
