import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

interface Props {
  poolIndex: number;
  totalPool: any;
  pools: any;
  pool: any;
  setPoolSelected: (value: any) => void;
  handleSelectDuration: (poolId: number, duration: any) => void;
}

const StakingPoolDuration: React.FunctionComponent<Props> = ({
  poolIndex,
  totalPool,
  pools,
  pool,
  setPoolSelected,
  handleSelectDuration,
}) => {
  // const childPools: any[] = pool?.items;
  const [poolAddress, setPoolAddress] = useState<string>();

  useEffect(() => {
    if (!poolAddress) setPoolAddress(pools[0]?.contract_address);
    setPoolSelected(pools?.find((pool) => pool.contract_address == poolAddress));
  }, [poolAddress, pools]);

  const handleSelect = (poolIndex: number, itemIndex: number, duration: number) => {
    const selectedPool = totalPool[poolIndex].est_apr[itemIndex];

    const defaultPool = poolIndex === 0 ? totalPool[1].est_apr[0] : totalPool[0].est_apr[0];

    const result = [
      {
        pool: poolIndex,
        apr: selectedPool?.value || 0,
      },
      {
        pool: poolIndex == 0 ? 1 : 0,
        apr: defaultPool.value,
      },
    ];

    setPoolSelected(result);
  };

  return (
    <div className={'flex items-center gap-2'}>
      {pools?.map((pool: any, index) => {
        return (
          <div
            key={pool?.id}
            onClick={(e) => {
              handleSelectDuration(poolIndex, pool?.time);
              handleSelect(poolIndex, index, pool?.time);
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
            {pool?.time}
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
