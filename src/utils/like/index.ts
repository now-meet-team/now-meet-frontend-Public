import moment from 'moment';

export const calculateRemainingTime = (targetTimeString: string) => {
  const targetTime = moment(targetTimeString);
  const currentTime = moment();

  const timeDifference = targetTime.diff(currentTime);

  const remainingTime = moment.duration(timeDifference);

  const remainingHours = remainingTime.hours();

  return {
    hours: remainingHours,
  };
};
