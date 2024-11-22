import dayjs from 'dayjs';
import moment from 'moment';

export const toUtcDayjs = (time: Date | string | null | undefined) =>
  dayjs(time).add(new Date().getTimezoneOffset(), 'minute');

export function insertDate(data: any[], currentPrice: number) {
  // const currentTime = new Date();
  const currentTime = moment().utc();
  const currentTimeString = currentTime.toISOString().slice(0, 19).replace('T', ' ');

  const formattedItems = data.map((item) => ({
    ...item,
    time: moment(item.time).utc(),
  }));

  let shouldInsert = false;

  for (let i = 0; i < formattedItems.length - 1; i++) {
    const startTime = formattedItems[i].time;
    const endTime = formattedItems[i + 1].time;

    if (currentTime > startTime && currentTime < endTime) {
      formattedItems.splice(i + 1, 0, { time: currentTime, price: currentPrice, isPast: false });
      shouldInsert = true;
      break;
    }
  }

  if (!shouldInsert) {
    if (currentTime < formattedItems[0].time) {
      formattedItems.unshift({ time: currentTime, price: currentPrice, isPast: false });
    } else {
      formattedItems.push({ time: currentTime, price: currentPrice, isPast: false });
    }
  }

  const result = formattedItems.map((item) => ({
    ...item,
    // time: item.time instanceof Date ? item.time.toISOString().slice(0, 19).replace('T', ' ') : item.time,
    time: moment(item.time).utc().format('MM-DD-YYYY HH:mm'),
  }));

  return result;
}
