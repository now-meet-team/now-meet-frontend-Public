import React from 'react';
import NickNameScreen from './NickNameScreen/NickNameScreen';

export default function SignUp() {
  const pageScreen = {
    0: <NickNameScreen />,
    1: <NickNameScreen />,
  };
  return pageScreen[0];
}
