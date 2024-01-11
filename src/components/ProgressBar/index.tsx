import React from 'react';
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
          style={{borderRadius: 0}}
          color={palette.bittersweet}
          borderColor={palette.white}
          progress={convertProgressToPage(pageNumbers, 10)}
          width={null}
          height={8}
          animated
        />
      </Bar>
    </BarView>
  );
};

export default ProgressBar;

const BarView = styled.View`
  width: 100%;
  flex-direction: row;
  margin-bottom: 24px;
`;

const Bar = styled.View`
  flex: 1;

  background-color: ${palette.progressColor};
`;
