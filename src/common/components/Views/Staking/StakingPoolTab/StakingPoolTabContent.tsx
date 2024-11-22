import StatusColumn from '@/common/components/Views/Staking/StakingCommonComponent/StatusColumn';
import { DEFAULT_DECIMALS, ENV, envNane } from '@/common/consts';
import { showConnect } from '@/common/stores/actions/appAction';
import { formatNumber, formatPercentNumber } from '@/utils';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Button, Col, Row, Table } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAccount } from 'wagmi';

interface Props {
  token: any;
  dataSource: any;
  setShowModalStaking: (val: boolean) => void;
  setSelectedPool: (val: any) => void;
  info1: any;
  info2: any;
  info3: any;
}

const StakingPoolTabContent: React.FunctionComponent<Props> = ({
  token,
  dataSource,
  setShowModalStaking,
  setSelectedPool,
  info1,
  info2,
  info3,
}) => {
  const { address } = useAccount();
  const dispatch = useDispatch();
  const app = useSelector((state: any) => state.app);
  const { openConnectModal } = useConnectModal();

  return (
    <div className={'staking-tabs mt-4'}>
      <div className={'flex flex-col sm:hidden gap-6'}>
        {dataSource?.map((item: any) => (
          <div
            key={item?.id}
            onClick={() => {
              if (!address) {
                if (openConnectModal) {
                  openConnectModal();
                }
                return;
              }
              setSelectedPool(item);
              setShowModalStaking(true);
            }}
            className={'bg-[#2A2B36] p-4'}
          >
            <div className={'flex flex-col gap-3 font-medium'}>
              <div className={'flex justify-between items-center mb-2'}>
                <div>
                  <div className={'text-[#fff] text-base font-bold'}>{item?.pool_name}</div>
                </div>
                <div className={'apr-text text-base font-bold'}>{item.est_apr[0]?.value}% APR</div>
              </div>
              <div className={'flex justify-between'}>
                <div className={'text-[#717681]'}>Staked amount</div>
                <div className={'text-[#fff] font-bold'}>
                  {ENV == envNane.TESTNET
                    ? formatNumber(
                        item?.id == '6'
                          ? Number(info1 ? (info1 as number[])[0] : 0) / Math.pow(10, 18)
                          : item?.id == '7'
                            ? Number(info2 ? (info2 as number[])[0] : 0) / Math.pow(10, 18)
                            : Number(info3 ? (info3 as number[])[0] : 0) / Math.pow(10, 18),
                      )
                    : formatNumber(
                        item?.id == '2'
                          ? Number(info1 ? (info1 as number[])[0] : 0) / Math.pow(10, 18)
                          : item?.id == '3'
                            ? Number(info2 ? (info2 as number[])[0] : 0) / Math.pow(10, 18)
                            : Number(info3 ? (info3 as number[])[0] : 0) / Math.pow(10, 18),
                      )}{' '}
                  UNICE
                </div>
              </div>
              <div className={'flex justify-between'}>
                <div className={'text-[#717681]'}>Staking cap</div>
                <div className={'text-[#fff] font-bold'}>Unlimited</div>
              </div>
              <div className={'flex justify-between'}>
                <div className={'text-[#717681]'}>Duration (months)</div>
                <div className={'text-[#fff] font-bold'}>{item?.est_apr[0]?.time} months</div>
              </div>
              <Button
                className={`h-[36px] hover:bg-[#4A7DFF] disabled:bg-[#ccc] text-[#fff] dark:text-[#fff] bg-[#4A7DFF] border-none rounded-[4px] font-medium mt-2`}
                type="primary"
                onClick={() => setShowModalStaking(true)}
              >
                Stake now
              </Button>
              {/*<div className={'flex justify-between'}>*/}
              {/*  <div className={'text-[#717681]'}>Status</div>*/}
              {/*  <StatusColumn record={item} isMobile={true} />*/}
              {/*</div>*/}
            </div>
          </div>
        ))}
      </div>
      {/*<Table*/}
      {/*  className={'staking-pools-table rounded-[12px] hidden sm:block'}*/}
      {/*  scroll={{ x: 920 }}*/}
      {/*  // rowKey={(row) => row?.id}*/}
      {/*  onRow={(record, rowIndex) => {*/}
      {/*    return {*/}
      {/*      onClick: () => {*/}
      {/*        setSelectedPool(record);*/}
      {/*        setShowModalStaking(true);*/}
      {/*      },*/}
      {/*    };*/}
      {/*  }}*/}
      {/*  columns={columns}*/}
      {/*  dataSource={dataSource}*/}
      {/*  pagination={false}*/}
      {/*/>*/}
      <Row className={'hidden sm:flex table-header bg-[#1C1D25]'}>
        <Col sm={4}>Pool</Col>
        <Col sm={2}>APR</Col>
        <Col sm={5}>Duration (months)</Col>
        <Col sm={4}>Staking cap</Col>
        <Col sm={5}>Staked amount</Col>
        <Col sm={4}></Col>
      </Row>
      {dataSource?.map((item: any) => (
        <Row
          key={item?.id}
          className={'hidden sm:flex table-item cursor-pointer'}
          onClick={() => {
            if (!address) {
              if (openConnectModal) {
                openConnectModal();
              }
              return;
            }
            setSelectedPool(item);
            setShowModalStaking(true);
          }}
        >
          <Col sm={4}>
            <div className={'text-base'}>
              <div className={'text-title font-semibold'}>{item?.pool_name}</div>
            </div>
          </Col>
          <Col sm={2}>
            <div className={'apr-text text-[#1AC774] text-xl font-bold'}>
              {formatPercentNumber(item?.est_apr[0]?.value)}%
            </div>
          </Col>
          <Col sm={5}>
            <div className={'text-base text-title font-medium'}>{item?.est_apr[0]?.time} months</div>
          </Col>
          <Col sm={4}>
            <div className={'text-base text-title font-medium'}>Unlimited</div>
          </Col>
          <Col sm={5}>
            <div className={'text-base text-title font-medium'}>
              {ENV == envNane.TESTNET
                ? formatNumber(
                    item?.id == '6'
                      ? Number(info1 ? (info1 as number[])[0] : 0) / Math.pow(10, 18)
                      : item?.id == '7'
                        ? Number(info2 ? (info2 as number[])[0] : 0) / Math.pow(10, 18)
                        : Number(info3 ? (info3 as number[])[0] : 0) / Math.pow(10, 18),
                  )
                : formatNumber(
                    item?.id == '2'
                      ? Number(info1 ? (info1 as number[])[0] : 0) / Math.pow(10, 18)
                      : item?.id == '3'
                        ? Number(info2 ? (info2 as number[])[0] : 0) / Math.pow(10, 18)
                        : Number(info3 ? (info3 as number[])[0] : 0) / Math.pow(10, 18),
                  )}{' '}
              UNICE
            </div>
          </Col>
          <Col sm={4}>
            <StatusColumn record={item} isMobile={false} />
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default StakingPoolTabContent;
