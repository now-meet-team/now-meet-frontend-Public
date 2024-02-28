import moment from 'moment';

export const formatTimeToAMPM = (time: string) => {
  const formattedTime = moment(time, 'YYYY-MM-DD HH:mm:ss').format('h:mm A');

  return formattedTime;
};
