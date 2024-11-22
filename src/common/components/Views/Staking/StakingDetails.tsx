import Skeleton from '@/common/components/Skeleton';
import { formatNumber, formatRewardBalance } from '@/utils';
import { Col, Popover, Row } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';

interface Props {
  loading: boolean;
  vipLevel: VipLevel;
  balanceStaked: number | string | any;
  stakeInfo: StakeInfo;
  poolInfo: PollInfo;
}

const StakingDetails: React.FunctionComponent<Props> = ({ loading, vipLevel, balanceStaked, stakeInfo, poolInfo }) => {
  return (
    <Row gutter={[0, 4]}>
      <Col xs={24} className={''}>
        {loading ? (
          <Skeleton className={'flex justify-center items-center w-full h-[152px]'} />
        ) : (
          <div className={'flex flex-col w-full h-[152px] bg-[#2A2B36] py-6 px-4 gap-5'}>
            <div className={'text-base font-medium text-[#8E929B]'}>Current VIP Tier</div>
            <div>
              {!vipLevel?.vip ? (
                <div className={'text-sm text-[#FFD336]'}>
                  You are not yet a VIP.
                  <br /> Stake now to receive rewards and <br /> participate in the IDO
                </div>
              ) : (
                <div className={'flex items-center text-3xl font-medium'}>
                  {/*<Image src={require(`@/common/assets/images/staking/${vipLevel?.vip}.png`)} alt="" />*/}
                  {vipLevel?.vip}
                </div>
              )}
            </div>
          </div>
        )}
      </Col>
      <Col xs={24} className={''}>
        {loading ? (
          <Skeleton className={'flex justify-center items-center w-full h-[128px]'} />
        ) : (
          <div className={'flex flex-col w-full h-[128px] bg-[#2A2B36] py-6 px-4 gap-5'}>
            <div className={'text-base font-medium text-[#8E929B]'}>Staked Amount</div>
            <div className={'text-3xl font-medium'}>
              {/*{connected ? formatNumber(Number(stakeInfo?.stake_amount) / Math.pow(10, 8)) : 0} MGPT*/}
              {formatNumber(Number(vipLevel?.amount))} UNICE
            </div>
          </div>
        )}
      </Col>
      <Col xs={24} className={''}>
        {loading ? (
          <Skeleton className={'flex justify-center items-center w-full h-[128px]'} />
        ) : (
          <div className={'flex flex-col w-full h-[128px] bg-[#2A2B36] py-6 px-4 gap-5'}>
            <div className={'flex items-center gap-2'}>
              <div className={'text-base font-medium text-[#8E929B]'}>Current voting power</div>
              {/*<Popover*/}
              {/*  placement="top"*/}
              {/*  showArrow={false}*/}
              {/*  content={*/}
              {/*    <div className={'w-[280px]'}>*/}
              {/*      The previously accrued interest is retained and added to the final cumulative earnings at the end of*/}
              {/*      the staking period.*/}
              {/*    </div>*/}
              {/*  }*/}
              {/*  trigger="hover"*/}
              {/*>*/}
              {/*  <div className={'cursor-pointer'}>*/}
              {/*    <QuestionIcon />*/}
              {/*  </div>*/}
              {/*</Popover>*/}
            </div>
            {stakeInfo && balanceStaked != 0 ? (
              <div className={'text-3xl font-medium'}>0 veMGPT</div>
            ) : (
              <div className={'text-3xl font-medium'}>-</div>
            )}
          </div>
        )}
      </Col>
      <Col xs={24} className={''}>
        {loading ? (
          <Skeleton className={'flex justify-center items-center w-full h-[128px]'} />
        ) : (
          <div className={'flex flex-col w-full h-[128px] bg-[#2A2B36] py-6 px-4 gap-5'}>
            <div className={'text-3xl font-medium'}>{formatNumber(vipLevel?.required)} UNICE</div>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default StakingDetails;
