import React from 'react';
import {shallow} from 'zustand/shallow';

import Input from '@components/Common/Input/Input';
import SignUpLayout from '@layout/SignUpLayout/SignUpLayout';
import {useNickNameStore} from 'store/signup/signUpStore';
import {useNickNameDuplication} from 'lib/query/signIn';

import useDebounce from 'hooks/useDebounce';

import {palette} from 'config/globalStyles';
import styled from 'styled-components/native';

export default function NickNameScreen() {
  const nickName = useNickNameStore(state => state.nickName, shallow);
  const handleNickName = useNickNameStore(state => state.handleNickName);

  const nickNameDebounce = useDebounce(nickName, 200);
  const {nicknameDuplication} = useNickNameDuplication(nickNameDebounce);

  const nicknameState = {
    isValidFormat: /[^a-zA-Z0-9가-힣]/g.test(nickName),
    isDuplicate: nicknameDuplication?.data.data,
  };

  return (
    <SignUpLayout
      title={'안녕하세요!\n닉네임을 입력해주세요.'}
      disabled={
        !nickName || nicknameState.isDuplicate || nicknameState.isValidFormat
      }>
      <Input
        onChangeText={text => handleNickName(text)}
        value={nickName}
        placeholder="닉네임을 입력해주세요"
      />

      {nicknameState.isValidFormat && (
        <StyledText>한·영만 지원하며 특수문자 사용이 불가능 합니다.</StyledText>
      )}

      {nicknameState.isDuplicate && (
        <StyledText>이미 사용중인 닉네임 입니다.</StyledText>
      )}
    </SignUpLayout>
  );
}

const StyledText = styled.Text`
  padding-left: 20px;

  color: ${palette.redText};
`;
