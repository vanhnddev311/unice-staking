import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

interface Props {
  poolIndex: number;
  pools: any;
  setPoolSelected: (value: any) => void;
  handleSelectDuration: (poolId: number, duration: any) => void;
}

const StakingPoolDuration: React.FunctionComponent<Props> = ({
  poolIndex,
  pools,
  setPoolSelected,
  handleSelectDuration,
}) => {
  const childPools: any[] = pools?.items;
  const [poolAddress, setPoolAddress] = useState<string>();

  useEffect(() => {
    if (!poolAddress) setPoolAddress(childPools[0]?.contract_address);
    setPoolSelected(childPools?.find((pool) => pool.contract_address == poolAddress));
  }, [poolAddress, childPools]);

  return (
    <div className={'flex items-center gap-2'}>
      {childPools?.map((pool: any, index) => {
        return (
          <div
            key={pool?.id}
            onClick={(e) => {
              handleSelectDuration(poolIndex, pool?.est_apr[0]?.time);
              setPoolAddress(pool?.contract_address);
              e.stopPropagation();
            }}
            className={classNames(
              'relative flex justify-center items-center w-[32px] h-[32px] bg-[#393C46] border-[2px] border-[#393C46] rounded-[4px] text-[#fff] text-sm font-semibold cursor-pointer',
              {
                'border-[2px] border-[#4A7DFF]': poolAddress === pool?.contract_address,
              },
            )}
          >
            {pool?.est_apr[0]?.time}
            {/*<Image*/}
            {/*  src={require('@/common/assets/images/staking/selected-pool-icon.png')}*/}
            {/*  alt={''}*/}
            {/*  className={`${poolAddress == pool?.contract_address ? 'block' : 'hidden'} absolute w-[16px] h-[16px] top-[-1px] right-0 rounded-tr-[4px]`}*/}
            {/*/>*/}
          </div>
        );
      })}
    </div>
  );
};

export default StakingPoolDuration;
