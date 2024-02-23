import useCountdownTimer from 'hooks/useCountdown';
import React from 'react';
import styled from 'styled-components/native';

type EndTimeBoxType = {
  chatTime: string;
};

const EndTimeBox = (props: EndTimeBoxType) => {
  const {chatTime} = props;
  const remainingTime = useCountdownTimer(chatTime);

  return (
    <StyledEndTimeBox>
      <EndTimeBoxText>
        대화 종료까지 남은 시간 <MessageTimeEnd>{remainingTime}</MessageTimeEnd>
      </EndTimeBoxText>
    </StyledEndTimeBox>
  );
};

export default EndTimeBox;

export const StyledEndTimeBox = styled.View`
  width: 90%;

  margin-top: 12px;
  margin-bottom: 12px;

  text-align: center;
  display: flex;

  align-self: center;

  border-radius: 5px;
  background-color: 'rgba(233, 182, 0, 0.1)';
`;

export const EndTimeBoxText = styled.Text`
  padding: 12px;
  text-align: center;
`;

export const MessageTimeEnd = styled.Text`
  color: #e9b600;
`;
