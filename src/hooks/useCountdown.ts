import {useCallback, useEffect, useState} from 'react';
import moment from 'moment';

const useCountdownTimer = (disconnectTime: string) => {
  const [remainingTime, setRemainingTime] = useState<string>('');

  const calculateRemainingTime = useCallback(() => {
    const endTime = moment(disconnectTime);
    const currentTime = moment();
    const duration = moment.duration(Math.abs(endTime.diff(currentTime)));
    const formattedTime = `${duration.hours()} 시간 ${duration.minutes()} 분 ${duration.seconds()} 초`;
    setRemainingTime(formattedTime);
  }, [disconnectTime]);

  useEffect(() => {
    calculateRemainingTime();
    const intervalId = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(intervalId);
  }, [calculateRemainingTime]);

  return remainingTime;
};

export default useCountdownTimer;
