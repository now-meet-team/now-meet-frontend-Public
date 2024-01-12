import React from 'react';
import {shallow} from 'zustand/shallow';

import Input from '@components/Common/Input/Input';
import SignUpLayout from '@layout/SignUpLayout/SignUpLayout';
import {useNickNameStore} from 'store/signup/signUpStore';
import {useNickNameDuplication} from 'lib/query/signIn';

import useDebounce from 'hooks/useDebounce';

export default function NickNameScreen() {
  const nickName = useNickNameStore(state => state.nickName, shallow);
  const handleNickName = useNickNameStore(state => state.handleNickName);

  const nickNameDebounce = useDebounce(nickName, 500);
  const {nicknameDuplication} = useNickNameDuplication(nickNameDebounce);

  return (
    <SignUpLayout
      title={'안녕하세요!\n닉네임을 입력해주세요.'}
      disabled={!nickName || nicknameDuplication?.data.data}>
      <Input
        onChangeText={text => handleNickName(text)}
        value={nickName}
        placeholder="닉네임을 입력해주세요"
      />
    </SignUpLayout>
  );
}
