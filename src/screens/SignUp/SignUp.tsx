import React from 'react';

import {useNavigationStore} from '../../store/signup/signUpStore';
import BirthDayScreen from './BirthDayScreen/BirthDayScreen';
import GenderScreen from './GenderScreen/GenderScreen';
import HeightScreen from './HeightScreen/HeightScreen';
import HobbyScreen from './HobbyScreen/HobbyScreen';
import JobScreen from './JobScreen/JobScreen';
import NickNameScreen from './NickNameScreen/NickNameScreen';
import SelfScreen from './SelfScreen/SelfScreen';
import TermScreen from './TermScreen/TermScreen';
import UploadImageScreen from './UploadImageScreen/UploadImageScreen';
import CurrentPositionScreen from './CurrentPositionScreen/CurrentPositionScreen';

type PageScreenType = {
  [key: number]: JSX.Element;
};

export default function SignUp() {
  const pageNumber = useNavigationStore(state => state.pageNumber);

  const pageScreen: PageScreenType = {
    0: <NickNameScreen />,
    1: <GenderScreen />,
    2: <BirthDayScreen />,
    3: <CurrentPositionScreen />,
    4: <HeightScreen />,
    5: <JobScreen />,
    6: <SelfScreen />,
    7: <HobbyScreen />,
    8: <UploadImageScreen />,
    9: <TermScreen />,
  };

  return pageScreen[pageNumber];
}
