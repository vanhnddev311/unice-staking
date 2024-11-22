import { getData } from '@/common/hooks/useLocalStoragre';
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
  campaign: any;
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

const CountdownActiveCampaign: React.FunctionComponent<CountdownProps> = ({ campaign, onMomentChange }) => {
  const [time_left, setTimeLeft] = useState<Time>(default_time);
  const [isEndCountdown, setIsEndCountdown] = useState<boolean>(false);
  const app = useSelector((state: any) => state.app);
  const dispatch = useDispatch();
  const end_at = new Date(campaign?.end_time).getTime() / 1000;

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
    <div className={'w-full text-[#131316]'}>
      <div className={'relative w-full'}>
        <div className={'w-full flex justify-between items-center rounded-[12px] bg-[#F6F6F6] p-1 gap-1'}>
          <div className={'flex flex-col items-center w-[84px] px-[18px] py-[8px]'}>
            <div className={'text-lg font-bold'}>{time_left.days}</div>
            <div>days</div>
          </div>
          <div>:</div>
          <div className={'flex flex-col items-center w-[84px] px-[18px] py-[6px]'}>
            <div className={'text-lg font-bold'}>{time_left.hours}</div>
            <div>hours</div>
          </div>
          <div>:</div>
          <div className={'flex flex-col items-center w-[84px] px-[18px] py-[6px]'}>
            <div className={'text-lg font-bold'}>{time_left.minutes}</div>
            <div>mins</div>
          </div>
          <div>:</div>
          <div className={'flex flex-col items-center w-[84px] px-[18px] py-[6px]'}>
            <div className={'text-lg font-bold'}>{time_left.seconds}</div>
            <div>secs</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CountdownActiveCampaign;
