import { formatRewardBalance } from '@/utils';
import Image from 'next/image';
import React from 'react';

interface Props {
  uniceAPR: number;
  frensAPR: number;
}

const StakingPoolAPR: React.FunctionComponent<Props> = ({ uniceAPR, frensAPR }) => {
  return (
    <div className={'w-full text-[#fff]'}>
      <div className={'w-full flex justify-between'}>
        <div className={'flex items-center h-fit gap-2'}>
          <Image src={require('@/common/assets/images/unice-logo-icon.png')} alt={''} className={'w-[16px]'} />
          <div>UNICE</div>
        </div>
        <div className={'text-end'}>{formatRewardBalance(uniceAPR, 2)}%</div>
      </div>
      <div className={'w-full flex justify-between mt-2'}>
        <div className={'flex items-center h-fit gap-2'}>
          <Image src={require('@/common/assets/images/frens.png')} alt={''} className={'w-[16px] h-[16px]'} />
          <div>FRENS</div>
        </div>
        <div className={'text-end'}>{formatRewardBalance(frensAPR, 2)}%</div>
      </div>
      <Image src={require('@/common/assets/images/staking/Line 38.png')} alt={''} className={'py-2'} />
      <div className={'w-full flex justify-between'}>
        <div className={'flex items-center h-fit gap-2'}>
          <div>Total APR</div>
        </div>
        <div className={'text-end apr-text'}>{formatRewardBalance(uniceAPR + frensAPR, 2)}%</div>
      </div>
    </div>
  );
};

export default StakingPoolAPR;
