import {useCallback, useEffect, useRef, useState} from 'react';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from 'navigation/Routes';
import {ChatStatus} from 'types/chat';

const useCountdownTimer = (disconnectTime: string, status: string) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const [remainingTime, setRemainingTime] = useState<string>('');
  const intervalIdRef = useRef<NodeJS.Timer | null>(null);

  const checkTimerExpiration = useCallback(
    (duration: moment.Duration) => {
      if (status === ChatStatus.OPEN && duration.asMilliseconds() <= 0) {
        navigation.goBack();
        return true;
      }

      if (duration.asMilliseconds() <= 0 && intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        setRemainingTime('');
        return true;
      }

      return false;
    },
    [navigation, status],
  );

  const calculateRemainingTime = useCallback(() => {
    const endTime = moment(disconnectTime);

    const currentTime = moment();
    const duration = moment.duration(endTime.diff(currentTime));

    const isTimerExpired = checkTimerExpiration(duration);

    if (isTimerExpired) {
      return;
    }

    const formattedTime = `${duration.hours()} 시간 ${duration.minutes()} 분 ${duration.seconds()} 초`;

    setRemainingTime(formattedTime);
  }, [disconnectTime, checkTimerExpiration]);

  useEffect(() => {
    intervalIdRef.current = setInterval(calculateRemainingTime, 1000);

    return () => {
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef?.current);
      }
    };
  }, [calculateRemainingTime]);

  return remainingTime;
};

export default useCountdownTimer;
