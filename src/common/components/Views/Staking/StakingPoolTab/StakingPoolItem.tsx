import StatusColumn from '@/common/components/Views/Staking/StakingCommonComponent/StatusColumn';
import StakingPoolDuration from '@/common/components/Views/Staking/StakingPoolTab/StakingPoolDuration';
import { ENV, envNane } from '@/common/consts';
import { formatNumber } from '@/utils';
import { Button, Col, Row } from 'antd';
import moment from 'moment';
import Image from 'next/image';
import React, { useEffect } from 'react';

const StakingPoolItem: React.FunctionComponent<{
  index: number;
  pools: any;
  pool: any;
  token: any;
  infoPool: any;
  infoPool2: any;
  selectedPool: any;
  selectedDurations: any;
  setSelectedPool: (val: any) => void;
  handleSelectDuration: (poolId: number, duration: any) => void;
  setShowModalStaking: (value: any) => void;
}> = ({
  index,
  pools,
  pool,
  token,
  selectedPool,
  selectedDurations,
  infoPool,
  infoPool2,
  setShowModalStaking,
  setSelectedPool,
  handleSelectDuration,
}) => {
  useEffect(() => {
    handleSelectDuration(index, pool?.items[0]?.est_apr[0]?.time);
  }, [pools]);

  const isClosed = moment(selectedPool?.close_at).diff(Date.now()) / (1000 * 60 * 60 * 24) < 0;

  return (
    <section>
      <div className={'flex flex-col sm:hidden gap-3 font-medium rounded-[16px] bg-[#23252E] p-4'}>
        <div className={'flex justify-between items-center mb-2'}>
          <div>
            <div className={'text-[#fff] text-base font-bold'}>{pool?.name}</div>
          </div>
          <div className={'apr-text text-base font-bold'}>
            {pool?.items.flatMap((item: any) => item.est_apr).find((apr: any) => apr.time === selectedDurations[index])
              ?.value || 0}
            %
          </div>
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
                  ? selectedPool?.id === '6'
                    ? 0
                    : selectedPool?.id === '7'
                      ? 1
                      : 2
                  : selectedPool?.id === '2'
                    ? 0
                    : selectedPool?.id === '3'
                      ? 1
                      : 2;

              const poolIndex2 =
                ENV === envNane.TESTNET
                  ? selectedPool?.id === '3'
                    ? 0
                    : selectedPool?.id === '4'
                      ? 1
                      : 2
                  : selectedPool?.id === '2'
                    ? 0
                    : selectedPool?.id === '3'
                      ? 1
                      : 2;

              const poolResult =
                index == 0
                  ? ((infoPool[poolIndex]?.result as number[]) ?? 0)
                  : ((infoPool2[poolIndex2]?.result as number[]) ?? 0);

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
          <div className={'text-[#717681]'}>Duration</div>
          <StakingPoolDuration
            poolIndex={index}
            pools={pools}
            pool={pool}
            setPoolSelected={setSelectedPool}
            handleSelectDuration={handleSelectDuration}
          />
        </div>
        <div className={'flex justify-between'}>
          <div className={'text-[#717681]'}>Status</div>
          <StatusColumn record={selectedPool} isMobile={true} />
        </div>
        <Button
          className={`h-[36px] hover:bg-[#4A7DFF] disabled:bg-[#ccc] text-[#fff] bg-[#4A7DFF] border-none rounded-[4px] font-semibold text-base mt-2`}
          type="primary"
          onClick={() => setShowModalStaking(true)}
        >
          {!isClosed ? 'Stake now' : 'Unstake'}
        </Button>
      </div>

      <Row className={'table-item hidden sm:flex h-[96px] bg-[#2A2B36] text-base text-[#fff]'}>
        <Col sm={4} className={'flex items-center p-6'}>
          <div className={'flex items-center gap-3'}>
            <Image src={require('@/common/assets/images/unice-logo-icon.png')} alt={''} className={'w-[40px]'} />
            <div>
              <div className={'font-bold'}>{pool?.name}</div>
              <div className={'text-sm text-[#FFFFFF80]'}>UNICE</div>
            </div>
          </div>
        </Col>
        <Col sm={2} className={'flex items-center text-center text-xl font-medium p-6'}>
          <div className={'apr-text'}>
            {pool?.items.flatMap((item: any) => item.est_apr).find((apr: any) => apr.time === selectedDurations[index])
              ?.value || 0}
            %
          </div>
        </Col>
        <Col sm={5} className={'flex items-center p-6'}>
          <div>
            <StakingPoolDuration
              poolIndex={index}
              pools={pools}
              pool={pool}
              setPoolSelected={setSelectedPool}
              handleSelectDuration={handleSelectDuration}
            />
          </div>
        </Col>
        <Col sm={4} className={'flex items-center font-medium p-6'}>
          Unlimited
        </Col>
        <Col sm={5} className={'flex items-center font-medium p-6'}>
          <div className={'text-[#fff]'}>
            {(() => {
              if (!infoPool || infoPool.some((pool: any) => !pool || !pool.result)) {
                return '0 UNICE';
              }

              const poolIndex =
                ENV === envNane.TESTNET
                  ? selectedPool?.id === '6'
                    ? 0
                    : selectedPool?.id === '7'
                      ? 1
                      : 2
                  : selectedPool?.id === '2'
                    ? 0
                    : selectedPool?.id === '3'
                      ? 1
                      : 2;

              const poolIndex2 =
                ENV === envNane.TESTNET
                  ? selectedPool?.id === '3'
                    ? 0
                    : selectedPool?.id === '4'
                      ? 1
                      : 2
                  : selectedPool?.id === '2'
                    ? 0
                    : selectedPool?.id === '3'
                      ? 1
                      : 2;

              const poolResult =
                index == 0
                  ? ((infoPool[poolIndex]?.result as number[]) ?? 0)
                  : ((infoPool2[poolIndex2]?.result as number[]) ?? 0);

              const formattedValue = formatNumber(Number(poolResult?.[0]) / Math.pow(10, 18) ?? 0);

              return `${formattedValue} UNICE`;
            })()}
          </div>
        </Col>
        <Col sm={4} className={'flex items-center p-6'}>
          <div>
            <StatusColumn record={selectedPool} isMobile={false} />
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default StakingPoolItem;
