import { formatRewardBalance } from '@/utils';
import Image from 'next/image';
import React from 'react';

interface Props {
  rewardUnice: any;
  rewardFrens: any;
  tokenPrice: number;
  frensPrice: number;
}

const StakingReward: React.FunctionComponent<Props> = ({ rewardUnice, rewardFrens, tokenPrice, frensPrice }) => {
  return (
    <div className={'w-full text-[#fff]'}>
      <div className={'w-full flex justify-between'}>
        <div className={'flex items-center h-fit gap-2'}>
          <Image src={require('@/common/assets/images/unice-logo-icon.png')} alt={''} className={'w-[16px]'} />
          <div>UNICE</div>
        </div>
        <div className={'text-end'}>
          <div>+{formatRewardBalance(rewardUnice, 4)}</div>
          <div className={'text-[#717681] text-xs'}>
            ~${formatRewardBalance(Number(rewardUnice) * tokenPrice, 4)} USDT
          </div>
        </div>
      </div>
      <div className={'w-full flex justify-between mt-1'}>
        <div className={'flex items-center h-fit gap-2'}>
          <Image src={require('@/common/assets/images/frens.png')} alt={''} className={'w-[16px] h-[16px]'} />
          <div>FRENS</div>
        </div>
        <div className={'text-end'}>
          <div>+{formatRewardBalance(rewardFrens, 4)}</div>
          <div className={'text-[#717681] text-xs'}>
            ~${formatRewardBalance(Number(rewardFrens) * frensPrice, 4)} USDT
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakingReward;
