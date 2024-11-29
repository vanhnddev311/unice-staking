import { APTIcon } from '@/common/components/icon/common';
import { formatNumberBalance, formatRewardBalance } from '@/utils';
import Image from 'next/image';
import React from 'react';

interface Props {
  rewardPool1: any;
  rewardPool2: any;
  tokenPrice: number;
}

const StakingReward: React.FunctionComponent<Props> = ({ rewardPool1, rewardPool2, tokenPrice }) => {
  return (
    <div className={'w-full text-[#fff]'}>
      <div className={'w-full flex justify-between'}>
        <div className={'flex items-center h-fit gap-2'}>
          <Image src={require('@/common/assets/images/unice-logo-icon.png')} alt={''} className={'w-[16px]'} />
          <div>UNICE</div>
        </div>
        <div className={'text-end'}>
          <div>+{formatRewardBalance(rewardPool1, 4)}</div>
          <div className={'text-[#717681] text-xs'}>
            ~${formatRewardBalance(Number(rewardPool1) * tokenPrice, 4)} USDT
          </div>
        </div>
      </div>
      <div className={'w-full flex justify-between mt-1'}>
        <div className={'flex items-center h-fit gap-2'}>
          <APTIcon />
          <div>FRENS</div>
        </div>
        <div className={'text-end'}>
          <div>+{formatRewardBalance(rewardPool2, 4)}</div>
          <div className={'text-[#717681] text-xs'}>
            ~${formatRewardBalance(Number(rewardPool2) * tokenPrice, 4)} USDT
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakingReward;
