import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import * as Progress from 'react-native-progress';
import {palette} from 'config/globalStyles';
import {useNavigationStore} from 'store/signup/signUpStore';
import {convertProgressToPage} from 'utils/progress';

const ProgressBar = () => {
  const pageNumbers = useNavigationStore(state => state.pageNumber);

  return (
    <BarView>
      <Bar>
        <Progress.Bar
          color={palette.bittersweet}
          borderColor={palette.white}
          progress={convertProgressToPage(pageNumbers, 9)}
          width={null}
          height={8}
          borderRadius={8}
          animated
        />
      </Bar>
    </BarView>
  );
};

export default ProgressBar;

const BarView = styled.View`
  width: 100%;
  padding: 0 15px;
  flex-direction: row;
`;

const Bar = styled.View`
  margin: 10px 0;
  flex: 1;
  background-color: ${palette.progressColor};
`;
