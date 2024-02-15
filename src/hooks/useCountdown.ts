import {useEffect, useState} from 'react';
import moment from 'moment';

const useCountdownTimer = (disconnectTime: string) => {
  const [remainingTime, setRemainingTime] = useState<string>('');

  useEffect(() => {
    const endTime = moment(disconnectTime);

    const intervalId = setInterval(() => {
      const currentTime = moment();
      const duration = moment.duration(endTime.diff(currentTime));
      const formattedTime = `${duration.hours()} 시간 ${duration.minutes()} 분 ${duration.seconds()} 초`;
      setRemainingTime(formattedTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [disconnectTime]);

  return remainingTime;
};

export default useCountdownTimer;
