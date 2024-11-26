import StakingPoolItem from '@/common/components/Views/Staking/StakingPoolTab/StakingPoolItem';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Col, Row } from 'antd';
import React from 'react';
import { useAccount } from 'wagmi';

interface Props {
  token: any;
  dataSource: any;
  selectedPool: any;
  setShowModalStaking: (val: boolean) => void;
  setSelectedPool: (val: any) => void;
  info1: any;
  info2: any;
  info3: any;
}

const StakingPoolTabContent: React.FunctionComponent<Props> = ({
  token,
  dataSource,
  selectedPool,
  setShowModalStaking,
  setSelectedPool,
  info1,
  info2,
  info3,
}) => {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  console.log('dataSource', dataSource);

  return (
    <div className={'staking-tabs mt-4'}>
      {/*<div className={'flex flex-col sm:hidden gap-6'}>*/}
      {/*  {dataSource?.map((item: any) => (*/}
      {/*    <div*/}
      {/*      key={item?.id}*/}
      {/*      onClick={() => {*/}
      {/*        if (!address) {*/}
      {/*          if (openConnectModal) {*/}
      {/*            openConnectModal();*/}
      {/*          }*/}
      {/*          return;*/}
      {/*        }*/}
      {/*        setSelectedPool(item);*/}
      {/*        setShowModalStaking(true);*/}
      {/*      }}*/}
      {/*      className={'bg-[#2A2B36] p-4'}*/}
      {/*    >*/}
      {/*      <div className={'flex flex-col gap-3 font-medium'}>*/}
      {/*        <div className={'flex justify-between items-center mb-2'}>*/}
      {/*          <div>*/}
      {/*            <div className={'text-[#fff] text-base font-bold'}>{item?.pool_name}</div>*/}
      {/*          </div>*/}
      {/*          <div className={'apr-text text-base font-bold'}>{item.est_apr[0]?.value}% APR</div>*/}
      {/*        </div>*/}
      {/*        <div className={'flex justify-between'}>*/}
      {/*          <div className={'text-[#717681]'}>Staked amount</div>*/}
      {/*          <div className={'text-[#fff] font-bold'}>*/}
      {/*            {ENV == envNane.TESTNET*/}
      {/*              ? formatNumber(*/}
      {/*                  item?.id == '6'*/}
      {/*                    ? Number(info1 ? (info1 as number[])[0] : 0) / Math.pow(10, 18)*/}
      {/*                    : item?.id == '7'*/}
      {/*                      ? Number(info2 ? (info2 as number[])[0] : 0) / Math.pow(10, 18)*/}
      {/*                      : Number(info3 ? (info3 as number[])[0] : 0) / Math.pow(10, 18),*/}
      {/*                )*/}
      {/*              : formatNumber(*/}
      {/*                  item?.id == '2'*/}
      {/*                    ? Number(info1 ? (info1 as number[])[0] : 0) / Math.pow(10, 18)*/}
      {/*                    : item?.id == '3'*/}
      {/*                      ? Number(info2 ? (info2 as number[])[0] : 0) / Math.pow(10, 18)*/}
      {/*                      : Number(info3 ? (info3 as number[])[0] : 0) / Math.pow(10, 18),*/}
      {/*                )}{' '}*/}
      {/*            UNICE*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*        <div className={'flex justify-between'}>*/}
      {/*          <div className={'text-[#717681]'}>Staking cap</div>*/}
      {/*          <div className={'text-[#fff] font-bold'}>Unlimited</div>*/}
      {/*        </div>*/}
      {/*        <div className={'flex justify-between'}>*/}
      {/*          <div className={'text-[#717681]'}>Duration (months)</div>*/}
      {/*          <div className={'text-[#fff] font-bold'}>{item?.est_apr[0]?.time} months</div>*/}
      {/*        </div>*/}
      {/*        <Button*/}
      {/*          className={`h-[36px] hover:bg-[#4A7DFF] disabled:bg-[#ccc] text-[#fff] dark:text-[#fff] bg-[#4A7DFF] border-none rounded-[4px] font-medium mt-2`}*/}
      {/*          type="primary"*/}
      {/*          onClick={() => setShowModalStaking(true)}*/}
      {/*        >*/}
      {/*          Stake now*/}
      {/*        </Button>*/}
      {/*        /!*<div className={'flex justify-between'}>*!/*/}
      {/*        /!*  <div className={'text-[#717681]'}>Status</div>*!/*/}
      {/*        /!*  <StatusColumn record={item} isMobile={true} />*!/*/}
      {/*        /!*</div>*!/*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*</div>*/}
      {/*<Row className={'hidden sm:flex table-header bg-[#1C1D25]'}>*/}
      {/*  <Col sm={4}>Pool</Col>*/}
      {/*  <Col sm={2}>APR</Col>*/}
      {/*  <Col sm={5}>Duration (months)</Col>*/}
      {/*  <Col sm={4}>Staking cap</Col>*/}
      {/*  <Col sm={5}>Staked amount</Col>*/}
      {/*  <Col sm={4}></Col>*/}
      {/*</Row>*/}
      {/*{dataSource?.map((item: any) => (*/}
      {/*  <Row*/}
      {/*    key={item?.id}*/}
      {/*    className={'hidden sm:flex table-item cursor-pointer'}*/}
      {/*    onClick={() => {*/}
      {/*      if (!address) {*/}
      {/*        if (openConnectModal) {*/}
      {/*          openConnectModal();*/}
      {/*        }*/}
      {/*        return;*/}
      {/*      }*/}
      {/*      setSelectedPool(item);*/}
      {/*      setShowModalStaking(true);*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <Col sm={4}>*/}
      {/*      <div className={'text-base'}>*/}
      {/*        <div className={'text-title font-semibold'}>{item?.pool_name}</div>*/}
      {/*      </div>*/}
      {/*    </Col>*/}
      {/*    <Col sm={2}>*/}
      {/*      <div className={'apr-text text-[#1AC774] text-xl font-bold'}>*/}
      {/*        {formatPercentNumber(item?.est_apr[0]?.value)}%*/}
      {/*      </div>*/}
      {/*    </Col>*/}
      {/*    <Col sm={5}>*/}
      {/*      <div className={'text-base text-title font-medium'}>{item?.est_apr[0]?.time} months</div>*/}
      {/*    </Col>*/}
      {/*    <Col sm={4}>*/}
      {/*      <div className={'text-base text-title font-medium'}>Unlimited</div>*/}
      {/*    </Col>*/}
      {/*    <Col sm={5}>*/}
      {/*      <div className={'text-base text-title font-medium'}>*/}
      {/*        {ENV == envNane.TESTNET*/}
      {/*          ? formatNumber(*/}
      {/*              item?.id == '6'*/}
      {/*                ? Number(info1 ? (info1 as number[])[0] : 0) / Math.pow(10, 18)*/}
      {/*                : item?.id == '7'*/}
      {/*                  ? Number(info2 ? (info2 as number[])[0] : 0) / Math.pow(10, 18)*/}
      {/*                  : Number(info3 ? (info3 as number[])[0] : 0) / Math.pow(10, 18),*/}
      {/*            )*/}
      {/*          : formatNumber(*/}
      {/*              item?.id == '2'*/}
      {/*                ? Number(info1 ? (info1 as number[])[0] : 0) / Math.pow(10, 18)*/}
      {/*                : item?.id == '3'*/}
      {/*                  ? Number(info2 ? (info2 as number[])[0] : 0) / Math.pow(10, 18)*/}
      {/*                  : Number(info3 ? (info3 as number[])[0] : 0) / Math.pow(10, 18),*/}
      {/*            )}{' '}*/}
      {/*        UNICE*/}
      {/*      </div>*/}
      {/*    </Col>*/}
      {/*    <Col sm={4}>*/}
      {/*      <StatusColumn record={item} isMobile={false} />*/}
      {/*    </Col>*/}
      {/*  </Row>*/}
      {/*))}*/}
      <div className={''}>
        <Row className={'hidden sm:flex table-header bg-[#1C1D25]'}>
          <Col sm={4}>Pool</Col>
          <Col sm={2}>APR</Col>
          <Col sm={5}>Duration (months)</Col>
          <Col sm={4}>Staking cap</Col>
          <Col sm={5}>Staked amount</Col>
          <Col sm={4}></Col>
        </Row>
        <div className={'flex flex-col gap-2'}>
          {/*{isFetchingPoolData && (*/}
          {/*  <div className={'flex flex-col gap-2'}>*/}
          {/*    <Row className={'staking-pool-item hidden sm:flex h-[96px] bg-[#2A2B36] text-base text-[#fff]'}>*/}
          {/*      <Col sm={4} className={'flex items-center font-bold px-4 py-6'}>*/}
          {/*        <Skeleton.Input active className={'w-full rounded-[4px] h-[20px]'}/>*/}
          {/*      </Col>*/}
          {/*      <Col sm={2} className={'flex items-center text-center text-[#C7E153] text-xl font-bold px-4 py-6'}>*/}
          {/*        <Skeleton.Input active className={'w-full rounded-[4px] h-[20px]'}/>*/}
          {/*      </Col>*/}
          {/*      <Col sm={5} className={'flex items-center px-4 py-6 gap-2'}>*/}
          {/*        <Skeleton.Input active className={'w-full rounded-[4px] h-[32px]'}/>*/}
          {/*        <Skeleton.Input active className={'w-full rounded-[4px] h-[32px]'}/>*/}
          {/*        <Skeleton.Input active className={'w-full rounded-[4px] h-[32px]'}/>*/}
          {/*      </Col>*/}
          {/*      <Col sm={5} className={'flex items-center font-bold px-4 py-6'}>*/}
          {/*        <Skeleton.Input active className={'w-full rounded-[4px] h-[20px]'}/>*/}
          {/*      </Col>*/}
          {/*      <Col sm={4} className={'flex items-center font-bold px-4 py-6'}>*/}
          {/*        <Skeleton.Input active className={'w-full rounded-[4px] h-[20px]'}/>*/}
          {/*      </Col>*/}
          {/*      <Col sm={4} className={'flex flex-col px-4 py-6 gap-2'}>*/}
          {/*        <Skeleton.Input active className={'w-1/2 rounded-[4px] h-[20px]'}/>*/}
          {/*        <Skeleton.Input active className={'w-[60%] rounded-[4px] h-[20px]'}/>*/}
          {/*      </Col>*/}
          {/*    </Row>*/}
          {/*    <Row className={'staking-pool-item hidden sm:flex h-[96px] bg-[#2A2B36] text-base text-[#fff]'}>*/}
          {/*      <Col sm={4} className={'flex items-center font-bold px-4 py-6'}>*/}
          {/*        <Skeleton.Input active className={'w-full rounded-[4px] h-[20px]'}/>*/}
          {/*      </Col>*/}
          {/*      <Col sm={2} className={'flex items-center text-center text-[#C7E153] text-xl font-bold px-4 py-6'}>*/}
          {/*        <Skeleton.Input active className={'w-full rounded-[4px] h-[20px]'}/>*/}
          {/*      </Col>*/}
          {/*      <Col sm={5} className={'flex items-center px-4 py-6 gap-2'}>*/}
          {/*        <Skeleton.Input active className={'w-full rounded-[4px] h-[32px]'}/>*/}
          {/*        <Skeleton.Input active className={'w-full rounded-[4px] h-[32px]'}/>*/}
          {/*        <Skeleton.Input active className={'w-full rounded-[4px] h-[32px]'}/>*/}
          {/*      </Col>*/}
          {/*      <Col sm={5} className={'flex items-center font-bold px-4 py-6'}>*/}
          {/*        <Skeleton.Input active className={'w-full rounded-[4px] h-[20px]'}/>*/}
          {/*      </Col>*/}
          {/*      <Col sm={4} className={'flex items-center font-bold px-4 py-6'}>*/}
          {/*        <Skeleton.Input active className={'w-full rounded-[4px] h-[20px]'}/>*/}
          {/*      </Col>*/}
          {/*      <Col sm={4} className={'flex flex-col px-4 py-6 gap-2'}>*/}
          {/*        <Skeleton.Input active className={'w-1/2 rounded-[4px] h-[20px]'}/>*/}
          {/*        <Skeleton.Input active className={'w-[60%] rounded-[4px] h-[20px]'}/>*/}
          {/*      </Col>*/}
          {/*    </Row>*/}
          {/*  </div>*/}
          {/*)}*/}
          {dataSource?.map((item: any, index: number) => {
            return (
              <div
                key={index}
                onClick={() => {
                  if (!address) {
                    if (openConnectModal) {
                      openConnectModal();
                    }
                    return;
                  }
                  setShowModalStaking(true);
                }}
              >
                <StakingPoolItem
                  pools={item}
                  info1={info1}
                  info2={info2}
                  info3={info3}
                  selectedPool={selectedPool}
                  setSelectedPool={setSelectedPool}
                  setShowModalStaking={setShowModalStaking}
                  token={token}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StakingPoolTabContent;
