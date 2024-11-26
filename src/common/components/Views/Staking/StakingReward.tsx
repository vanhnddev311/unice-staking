import Image from 'next/image';
import React from 'react';

const StakingReward = () => {
  return (
    <div className={'w-full text-[#fff]'}>
      <div className={'w-full flex justify-between'}>
        <div className={'flex items-center h-fit gap-2'}>
          <Image src={require('@/common/assets/images/unice-logo-icon.png')} alt={''} className={'w-[16px]'} />
          <div>UNICE</div>
        </div>
        <div>
          <div>+1,625,000</div>
          <div className={'text-[#717681] text-xs'}>~$200.26 USDT</div>
        </div>
      </div>
      <div className={'w-full flex justify-between mt-1'}>
        <div className={'flex items-center h-fit gap-2'}>
          <Image src={require('@/common/assets/images/staking/apt.png')} alt={''} className={'w-[16px]'} />
          <div>FRENS</div>
        </div>
        <div>
          <div>+1,625,000</div>
          <div className={'text-[#717681] text-xs'}>~$200.26 USDT</div>
        </div>
      </div>
    </div>
  );
};

export default StakingReward;
