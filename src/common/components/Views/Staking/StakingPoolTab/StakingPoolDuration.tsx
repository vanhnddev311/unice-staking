import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

interface Props {
  poolIndex: number;
  pools: any;
  pool: any;
  setPoolSelected: (value: any) => void;
  handleSelectDuration: (poolId: number, duration: any) => void;
}

const StakingPoolDuration: React.FunctionComponent<Props> = ({
  poolIndex,
  pools,
  pool,
  setPoolSelected,
  handleSelectDuration,
}) => {
  const childPools: any[] = pool?.items;
  const [poolAddress, setPoolAddress] = useState<string>();

  useEffect(() => {
    if (!poolAddress) setPoolAddress(childPools[0]?.contract_address);
    setPoolSelected(childPools?.find((pool) => pool.contract_address == poolAddress));
  }, [poolAddress, childPools]);

  const handleSelect = (poolIndex: number, itemIndex: number, duration: number) => {
    // Lấy thông tin của pool đã chọn
    const selectedPool = pools[poolIndex].items[itemIndex];
    const selectedPoolInfo = selectedPool.est_apr.find((apr: any) => apr.time === duration);

    const defaultPool = poolIndex === 0 ? pools[1].items[0] : pools[0].items[0]; // Lấy pool con đầu tiên của pool khác
    const defaultPoolInfo = defaultPool.est_apr[0]; // Chọn APR mặc định của pool từ pool khác

    // Tạo kết quả đầu ra
    const result = [
      {
        pool_name: selectedPool.pool_name,
        apr: selectedPoolInfo?.value || 0,
      },
      {
        pool_name: defaultPool.pool_name,
        apr: defaultPoolInfo.value,
      },
    ];

    setPoolSelected(result);
  };

  return (
    <div className={'flex items-center gap-2'}>
      {childPools?.map((pool: any, index) => {
        return (
          <div
            key={pool?.id}
            onClick={(e) => {
              handleSelectDuration(poolIndex, pool?.est_apr[0]?.time);
              handleSelect(poolIndex, index, pool?.est_apr[0]?.time);
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
