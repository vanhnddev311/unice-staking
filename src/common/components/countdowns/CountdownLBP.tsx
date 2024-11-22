import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export interface Time {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

interface CountdownProps {
  campaign: Campaign;
  round: any;
  isEnded: boolean;
  isSaleStarted: boolean;
  onMomentChange: () => void;
  width?: number;
  height?: number;
}

const default_time: Time = {
  days: '00',
  hours: '00',
  minutes: '00',
  seconds: '00',
};

const CountdownLBP: React.FunctionComponent<CountdownProps> = ({
  campaign,
  round,
  isEnded,
  isSaleStarted,
  onMomentChange,
}) => {
  const [time_left, setTimeLeft] = useState<Time>(default_time);
  const [isEndCountdown, setIsEndCountdown] = useState<boolean>(false);
  const app = useSelector((state: any) => state.app);
  const dispatch = useDispatch();
  const end_at = isSaleStarted
    ? new Date(round?.startTime).getTime() / 1000
    : !isEnded
      ? new Date(round?.endTime).getTime() / 1000
      : new Date().getTime() / 1000;

  const calculateTimeLeft = (): Time => {
    const now = moment.utc().valueOf();
    const count_down_end_at = new Date(end_at * 1000).getTime();
    const distance = count_down_end_at - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    let time_left = default_time;
    if (distance > 0) {
      setIsEndCountdown(false);
      time_left = {
        days: formatTimeLessThanTen(days),
        hours: formatTimeLessThanTen(hours),
        minutes: formatTimeLessThanTen(minutes),
        seconds: formatTimeLessThanTen(seconds),
      };
    } else {
      if (!isEndCountdown) {
        onMomentChange();
      }
      setIsEndCountdown(true);

      time_left = {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
      };
    }

    return time_left;
  };

  const formatTimeLessThanTen = (time: number): string => (time >= 10 ? time.toString() : `0${time}`);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <div className={'w-full'}>
      <div className={'relative w-full'}>
        <div className={'w-full flex items-center gap-1'}>
          <div
            className={
              'flex flex-col items-center w-[70px] px-[10px] rounded-[12px] border border-[#37393C] bg-[#14161A] py-[6px]'
            }
          >
            <div>{time_left.days}</div>
            <div>days</div>
          </div>
          <div>:</div>
          <div
            className={
              'flex flex-col items-center w-[70px] px-[10px] rounded-[12px] border border-[#37393C] bg-[#14161A] py-[6px]'
            }
          >
            <div>{time_left.hours}</div>
            <div>hours</div>
          </div>
          <div>:</div>
          <div
            className={
              'flex flex-col items-center w-[70px] px-[10px] rounded-[12px] border border-[#37393C] bg-[#14161A] py-[6px]'
            }
          >
            <div>{time_left.minutes}</div>
            <div>mins</div>
          </div>
          <div>:</div>
          <div
            className={
              'flex flex-col items-center w-[70px] px-[10px] rounded-[12px] border border-[#37393C] bg-[#14161A] py-[6px]'
            }
          >
            <div>{time_left.seconds}</div>
            <div>secs</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CountdownLBP;
