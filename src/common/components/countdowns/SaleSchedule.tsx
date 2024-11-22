import { dateFormat } from '@/common/consts';
import { toUtcDayjs } from '@/utils/date';
import { Collapse } from 'antd';
import Image from 'next/image';
import React, { useMemo, useState } from 'react';

interface SaleScheduleProps {
  campaign: Campaign;
  isEnded: boolean;
}

const { Panel } = Collapse;

const SaleSchedule: React.FunctionComponent<SaleScheduleProps> = ({ campaign, isEnded }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const now = new Date();
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

  const onChange = (key: string | string[]) => {
    if (key?.length > 0) setIsOpen(true);
  };
  const timeline = campaign?.section3?.rounds.filter(
    (round: Round) => round.type !== 'Campaign time' && round.type !== 'Registration',
  );
  timeline?.sort((a, b) => new Date(a?.startTime).valueOf() - new Date(b.startTime).valueOf());

  const currentRound = useMemo(() => {
    const newTimeline = timeline?.map((round: any, index) => {
      return { ...round, id: index + 1 };
    });
    return newTimeline?.find((round: any) => {
      let isProgress = false;
      if (round.startTime && round.endTime) {
        isProgress = new Date(round.startTime) <= now && now <= new Date(round.endTime);
      } else if (!round.endTime) {
        isProgress = new Date(round.startTime) <= now;
      } else {
        return;
      }

      if (isProgress) return round;
    });
  }, [timeline]);

  const CurrentRoundSelected = () => {
    return (
      <div className={`flex items-center gap-3 sm:gap-6`}>
        <div
          className={
            'flex justify-center items-center w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] px-3 py-[10px] rounded-[28px] bg-[#E7E7E8] text-default text-xs sm:text-base font-bold'
          }
        >
          {currentRound?.id}
        </div>
        <div className={'flex flex-col justify-center text-start'}>
          <div className={`text-sm sm:text-lg font-bold text-[#1AC774] ml-2 mb-2`}>{currentRound?.type} start</div>
          <div className={`text-xs sm:text-base font-normal text-default ml-2`}>
            {toUtcDayjs(currentRound?.startTime).format(dateFormat).slice(-12)} -{' '}
            {toUtcDayjs(currentRound?.startTime).format(dateFormat).slice(0, -12)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div
        className={
          'hidden sm:flex flex-col text-center sm:text-start sm:flex-row gap-5 justify-between w-full h-full px-4 sm:px-16 bg-[#F6F6F6] rounded-[16px]'
        }
      >
        {/*<div>*/}
        {/*  <div className={`text-lg font-bold ${isEnded ? 'text-[#E68345]' : 'text-[#B1B4B3]'} ml-2 mb-2`}>*/}
        {/*    Registration start*/}
        {/*  </div>*/}
        {/*  <div className={'text-sm font-normal text-[#B1B4B3] ml-2'}>*/}
        {/*    {toUtcDayjs(campaign?.section1?.registrationTime).format(dateFormat).slice(0, -12)}*/}
        {/*  </div>*/}
        {/*  <div className={'text-sm font-normal text-[#B1B4B3] ml-2'}>*/}
        {/*    {toUtcDayjs(campaign?.section1?.registrationTime).format(dateFormat).slice(-12)}*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<div className="self-center">*/}
        {/*  <ArrowRightIcon/>*/}
        {/*</div>*/}
        {/*<ArrowRightIcon />*/}
        {timeline?.map((schedule: any, index: number) => {
          let isProgress = false;
          if (schedule.startTime && schedule.endTime) {
            isProgress = new Date(schedule.startTime) <= now && now <= new Date(schedule.endTime);
          } else if (!schedule.endTime) {
            isProgress = new Date(schedule.startTime) <= now;
          } else {
            return;
          }

          return (
            <React.Fragment key={index}>
              <div className={'flex items-center py-10 gap-3 sm:gap-6'}>
                <div
                  className={
                    'flex justify-center items-center w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] px-3 py-[10px] rounded-[28px] bg-[#E7E7E8] text-default text-xs sm:text-base font-bold'
                  }
                >
                  {index + 1}
                </div>
                <div className={'flex flex-col justify-center text-start'}>
                  <div
                    className={`text-sm sm:text-lg font-bold ${isProgress && !isEnded ? 'text-[#1AC774]' : 'text-[#A1A1A2]'} ml-2 mb-2`}
                  >
                    {schedule.type} start
                  </div>
                  <div
                    className={`text-xs sm:text-base font-normal ${isProgress && !isEnded ? 'text-default' : 'text-[#89898B]'} ml-2`}
                  >
                    {toUtcDayjs(schedule.startTime).format(dateFormat).slice(-12)} -{' '}
                    {toUtcDayjs(schedule.startTime).format(dateFormat).slice(0, -12)}
                  </div>
                </div>
              </div>
              <div key={index + 'line'} className={'hidden sm:block max-h-max'}>
                {/*<ArrowRightIcon />*/}
                <Image
                  src={require('@/common/assets/images/launchpad/timeline-arrow.png')}
                  alt={''}
                  className={'h-full'}
                />
              </div>
            </React.Fragment>
          );
        })}
        <div className={'flex items-center gap-6'}>
          <div
            className={
              'flex justify-center items-center w-[40px] h-[40px] px-3 py-[10px] rounded-[28px] bg-[#E7E7E8] text-default text-base font-bold'
            }
          >
            {timeline?.length + 1}
          </div>
          <div className={'flex flex-col justify-center'}>
            <div className={`text-lg font-bold ${isEnded ? 'text-[#1AC774]' : 'text-[#727376]'} ml-2 mb-2`}>
              End time
            </div>
            <div className={`text-base font-normal ${isEnded ? 'text-default' : 'text-[#727376]'} ml-2`}>
              {toUtcDayjs(campaign?.section1?.endTime).format(dateFormat).slice(-12)} -{' '}
              {toUtcDayjs(campaign?.section1?.endTime).format(dateFormat).slice(0, -12)}
            </div>
          </div>
        </div>
      </div>
      <Collapse defaultActiveKey={['1']} onChange={onChange} className={'timeline-collapse'}>
        <Panel
          header={<CurrentRoundSelected />}
          key="1"
          showArrow={false}
          // className={`${isOpen ? 'hidden' : 'flex'}`}
        >
          <div
            className={
              'flex flex-col text-center sm:text-start sm:flex-row gap-5 justify-between w-full h-full px-4 sm:px-16 bg-[#F6F6F6] rounded-[8px] border border-[#E7E7E8]'
            }
          >
            {/*<div>*/}
            {/*  <div className={`text-lg font-bold ${isEnded ? 'text-[#E68345]' : 'text-[#B1B4B3]'} ml-2 mb-2`}>*/}
            {/*    Registration start*/}
            {/*  </div>*/}
            {/*  <div className={'text-sm font-normal text-[#B1B4B3] ml-2'}>*/}
            {/*    {toUtcDayjs(campaign?.section1?.registrationTime).format(dateFormat).slice(0, -12)}*/}
            {/*  </div>*/}
            {/*  <div className={'text-sm font-normal text-[#B1B4B3] ml-2'}>*/}
            {/*    {toUtcDayjs(campaign?.section1?.registrationTime).format(dateFormat).slice(-12)}*/}
            {/*  </div>*/}
            {/*</div>*/}
            {/*<div className="self-center">*/}
            {/*  <ArrowRightIcon/>*/}
            {/*</div>*/}
            {/*<ArrowRightIcon />*/}
            {timeline?.map((schedule: any, index: number) => {
              let isProgress = false;
              if (schedule.startTime && schedule.endTime) {
                isProgress = new Date(schedule.startTime) <= now && now <= new Date(schedule.endTime);
              } else if (!schedule.endTime) {
                isProgress = new Date(schedule.startTime) <= now;
              } else {
                return;
              }

              return (
                <React.Fragment key={index}>
                  <div className={'flex items-center py-10 gap-3 sm:gap-6'}>
                    <div
                      className={
                        'flex justify-center items-center w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] px-3 py-[10px] rounded-[28px] bg-[#E7E7E8] text-default text-xs sm:text-base font-bold'
                      }
                    >
                      {index + 1}
                    </div>
                    <div className={'flex flex-col justify-center text-start'}>
                      <div
                        className={`text-sm sm:text-lg font-bold ${isProgress && !isEnded ? 'text-[#1AC774]' : 'text-[#A1A1A2]'} ml-2 mb-2`}
                      >
                        {schedule.type} start
                      </div>
                      <div
                        className={`text-xs sm:text-base font-normal ${isProgress && !isEnded ? 'text-default' : 'text-[#89898B]'} ml-2`}
                      >
                        {toUtcDayjs(schedule.startTime).format(dateFormat).slice(-12)} -{' '}
                        {toUtcDayjs(schedule.startTime).format(dateFormat).slice(0, -12)}
                      </div>
                    </div>
                  </div>
                  <div key={index + 'line'} className={'hidden sm:block max-h-max'}>
                    {/*<ArrowRightIcon />*/}
                    <Image
                      src={require('@/common/assets/images/launchpad/timeline-arrow.png')}
                      alt={''}
                      className={'h-full'}
                    />
                  </div>
                </React.Fragment>
              );
            })}
            <div className={'flex items-center gap-6'}>
              <div
                className={
                  'flex justify-center items-center w-[40px] h-[40px] px-3 py-[10px] rounded-[28px] bg-[#E7E7E8] text-default text-base font-bold'
                }
              >
                {timeline?.length + 1}
              </div>
              <div className={'flex flex-col justify-center'}>
                <div className={`text-lg font-bold ${isEnded ? 'text-[#1AC774]' : 'text-[#727376]'} ml-2 mb-2`}>
                  End time
                </div>
                <div className={`text-base font-normal ${isEnded ? 'text-default' : 'text-[#727376]'} ml-2`}>
                  {toUtcDayjs(campaign?.section1?.endTime).format(dateFormat).slice(-12)} -{' '}
                  {toUtcDayjs(campaign?.section1?.endTime).format(dateFormat).slice(0, -12)}
                </div>
              </div>
            </div>
          </div>
        </Panel>
      </Collapse>
    </React.Fragment>
  );
};

export default SaleSchedule;
