import StatusColumn from '@/common/components/Views/Staking/StakingCommonComponent/StatusColumn';
import StakingPoolAPR from '@/common/components/Views/Staking/StakingPoolTab/StakingPoolAPR';
import StakingPoolDuration from '@/common/components/Views/Staking/StakingPoolTab/StakingPoolDuration';
import { ENV, envNane } from '@/common/consts';
import { formatNumber } from '@/utils';
import { Button, Col, Popover, Row } from 'antd';
import moment from 'moment';
import Image from 'next/image';
import React, { useEffect, useMemo } from 'react';

const StakingPoolItem: React.FunctionComponent<{
  index: number;
  totalPool: any;
  pools: any;
  pool: any;
  token: any;
  infoPool: any;
  infoPool2: any;
  selectedItem: any;
  handleSelectItems: (poolName: any, selectedId: any) => void;
  selectedPool: any;
  selectedDurations: any;
  setSelectedPool: (val: any) => void;
  handleSelectDuration: (poolId: number, duration: any) => void;
  setShowModalStaking: (value: any) => void;
}> = ({
  index,
  totalPool,
  pools,
  pool,
  token,
  selectedItem,
  handleSelectItems,
  selectedPool,
  selectedDurations,
  infoPool,
  infoPool2,
  setShowModalStaking,
  setSelectedPool,
  handleSelectDuration,
}) => {
  useEffect(() => {
    handleSelectDuration(index, pool?.est_apr[0]?.time);
  }, [pools]);

  const poolSelected = useMemo(() => {
    return pools?.find((apr: any) => apr.time === selectedDurations[index]);
  }, [pools, selectedDurations]);

  return (
    <section>
      <div className={'flex flex-col sm:hidden gap-3 font-medium rounded-[16px] bg-[#23252E] p-4'}>
        <div className={'flex justify-between items-center mb-2'}>
          <div className={'flex items-center gap-3'}>
            <Image src={require('@/common/assets/images/unice-logo-icon.png')} alt={''} className={'w-[40px]'} />
            <div>
              <div className={'font-bold'}>{pool?.pool_name}</div>
              <div className={'text-sm text-[#FFFFFF80]'}>UNICE</div>
            </div>
          </div>
        </div>
        <div className={'flex justify-between'}>
          <div className={'text-[#717681]'}>APR</div>
          <Popover
            content={<StakingPoolAPR uniceAPR={poolSelected?.value[0] ?? 0} frensAPR={poolSelected?.value[1] ?? 0} />}
            title={'Staking APR'}
          >
            <div className={'relative apr-text cursor-pointer'}>
              {Number(poolSelected?.value[0] ?? 0) + Number(poolSelected?.value[1] ?? 0)}%
              <Image
                src={require('@/common/assets/images/staking/Line 33.png')}
                alt={''}
                className={'absolute w-full'}
              />
            </div>
          </Popover>
        </div>
        <div className={'flex justify-between'}>
          <div className={'text-[#717681]'}>Staked amount</div>
          <div className={'text-[#fff] font-medium'}>
            {(() => {
              if (!infoPool || infoPool.some((pool: any) => !pool || !pool.result)) {
                return '0 UNICE';
              }

              const poolIndex =
                ENV === envNane.TESTNET
                  ? selectedItem?.id == '6'
                    ? 0
                    : selectedItem?.id == '7'
                      ? 1
                      : 2
                  : selectedItem?.id == '2'
                    ? 0
                    : selectedItem?.id == '4'
                      ? 1
                      : 2;

              const poolIndex2 =
                ENV === envNane.TESTNET
                  ? selectedItem?.id == '3'
                    ? 0
                    : selectedItem?.id == '4'
                      ? 1
                      : 2
                  : selectedItem?.id == '2'
                    ? 0
                    : selectedItem?.id == '4'
                      ? 1
                      : 2;

              const poolResult =
                index == 0
                  ? ((infoPool2?.[poolIndex2]?.result as number[]) ?? 0)
                  : ((infoPool?.[poolIndex]?.result as number[]) ?? 0);

              const formattedValue = formatNumber(Number(poolResult?.[0]) / Math.pow(10, 18) ?? 0);

              return `${formattedValue} UNICE`;
            })()}
          </div>
        </div>
        <div className={'flex justify-between'}>
          <div className={'text-[#717681]'}>Staking cap</div>
          <div className={'text-[#fff] font-medium'}>Unlimited</div>
        </div>
        <div className={'flex justify-between'}>
          <div className={'text-[#717681]'}>Duration (months)</div>
          <StakingPoolDuration
            poolIndex={index}
            poolName={pool?.pool_name}
            totalPool={totalPool}
            pools={pools}
            pool={pool}
            selectedItem={selectedItem}
            setPoolSelected={setSelectedPool}
            handleSelectItems={handleSelectItems}
            handleSelectDuration={handleSelectDuration}
          />
        </div>
        <div className={'flex justify-between'}>
          <div className={'text-[#717681]'}>Status</div>
          <StatusColumn record={selectedPool} isMobile={true} setShowModalStaking={setShowModalStaking} />
        </div>
        <Button
          className={`h-[36px] hover:bg-[#4A7DFF] disabled:bg-[#ccc] text-[#fff] bg-[#4A7DFF] border-none rounded-[4px] font-semibold text-base mt-2`}
          type="primary"
          onClick={() => setShowModalStaking(true)}
        >
          Stake now
        </Button>
      </div>

      <Row className={'table-item hidden sm:flex h-[96px] bg-[#2A2B36] text-base text-[#fff]'}>
        <Col sm={4} className={'flex items-center p-6'}>
          <div className={'flex items-center gap-3'}>
            <Image src={require('@/common/assets/images/unice-logo-icon.png')} alt={''} className={'w-[40px]'} />
            <div>
              <div className={'font-bold'}>{pool?.pool_name}</div>
              <div className={'text-sm text-[#FFFFFF80]'}>UNICE</div>
            </div>
          </div>
        </Col>
        <Col sm={4} className={'flex justify-center items-center text-xl font-medium p-6'}>
          <Popover
            content={<StakingPoolAPR uniceAPR={poolSelected?.value[0] ?? 0} frensAPR={poolSelected?.value[1] ?? 0} />}
            title={'Staking APR'}
          >
            <div className={'relative apr-text cursor-pointer'}>
              {Number(poolSelected?.value[0] ?? 0) + Number(poolSelected?.value[1] ?? 0)}%
              <Image
                src={require('@/common/assets/images/staking/Line 33.png')}
                alt={''}
                className={'absolute w-full'}
              />
            </div>
          </Popover>
        </Col>
        <Col sm={4} className={'flex justify-center items-center p-6'}>
          <div>
            <StakingPoolDuration
              poolIndex={index}
              poolName={pool?.pool_name}
              totalPool={totalPool}
              pools={pools}
              pool={pool}
              selectedItem={selectedItem}
              setPoolSelected={setSelectedPool}
              handleSelectItems={handleSelectItems}
              handleSelectDuration={handleSelectDuration}
            />
          </div>
        </Col>
        <Col sm={4} className={'flex items-center font-medium p-6'}>
          Unlimited
        </Col>
        <Col sm={4} className={'flex items-center font-medium p-6'}>
          <div className={'text-[#fff]'}>
            {(() => {
              if (!infoPool || infoPool.some((pool: any) => !pool || !pool.result)) {
                return '0 UNICE';
              }
              // console.log('selectedItem', selectedItem);

              const poolIndex =
                ENV === envNane.TESTNET
                  ? selectedItem?.id == '6'
                    ? 0
                    : selectedItem?.id == '7'
                      ? 1
                      : 2
                  : selectedItem?.id == '2'
                    ? 0
                    : selectedItem?.id == '4'
                      ? 1
                      : 2;

              const poolIndex2 =
                ENV === envNane.TESTNET
                  ? selectedItem?.id == '3'
                    ? 0
                    : selectedItem?.id == '4'
                      ? 1
                      : 2
                  : selectedItem?.id == '2'
                    ? 0
                    : selectedItem?.id == '4'
                      ? 1
                      : 2;

              const poolResult =
                index == 0
                  ? ((infoPool2?.[poolIndex2]?.result as number[]) ?? 0)
                  : ((infoPool?.[poolIndex]?.result as number[]) ?? 0);

              const formattedValue = formatNumber(Number(poolResult?.[0]) / Math.pow(10, 18) ?? 0);

              return `${formattedValue} UNICE`;
            })()}
          </div>
        </Col>
        <Col sm={4} className={'flex items-center p-6'}>
          <div>
            <StatusColumn record={selectedPool} isMobile={false} setShowModalStaking={setShowModalStaking} />
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default StakingPoolItem;
