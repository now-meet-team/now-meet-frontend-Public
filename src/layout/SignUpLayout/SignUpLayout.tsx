import React from 'react';

import styled from 'styled-components/native';
import {useNavigationStore} from '../../store/signup/signUpStore';
import {palette} from '../../config/globalStyles';
import Button from '../../components/Common/Button/Button';
import ProgressBar from 'components/ProgressBar';

type SignUpLayoutType = {
  title: string;
  subTitle?: string;
  children?: React.ReactNode;
};

export default function SignUpLayout(props: SignUpLayoutType) {
  const {title, subTitle, children} = props;

  const nextPage = useNavigationStore(state => state.handleNextPage);

  return (
    <SignUpLayoutContainer>
      <ProgressBar />
      <SignUpText>{title}</SignUpText>
      <SignUpSubText>{subTitle}</SignUpSubText>

      <ViewChildrenStyled>{children}</ViewChildrenStyled>

      <ButtonContainer>
        <Button
          backgroundColor={palette.awesome}
          title="다음"
          onPress={nextPage}
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
