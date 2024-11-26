import StatusColumn from '@/common/components/Views/Staking/StakingCommonComponent/StatusColumn';
import StakingPoolDuration from '@/common/components/Views/Staking/StakingPoolTab/StakingPoolDuration';
import { ENV, envNane } from '@/common/consts';
import { formatNumber } from '@/utils';
import { Button, Col, Row } from 'antd';
import moment from 'moment';
import React from 'react';

const StakingPoolItem: React.FunctionComponent<{
  pools: any;
  token: any;
  info1: any;
  info2: any;
  info3: any;
  selectedPool: any;
  setSelectedPool: (val: any) => void;
  setShowModalStaking: (value: any) => void;
}> = ({ pools, token, selectedPool, info1, info2, info3, setShowModalStaking, setSelectedPool }) => {
  const isClosed = moment(selectedPool?.close_at).diff(Date.now()) / (1000 * 60 * 60 * 24) < 0;
  return (
    <section>
      <div className={'flex flex-col sm:hidden gap-3 font-medium rounded-[16px] bg-[#23252E] p-4'}>
        <div className={'flex justify-between items-center mb-2'}>
          <div>
            <div className={'text-[#fff] text-base font-bold'}>{pools?.name}</div>
          </div>
          <div className={'apr-text text-base font-bold'}>{selectedPool?.est_apr[0].value}% APR</div>
        </div>
        <div className={'flex justify-between'}>
          <div className={'text-[#717681]'}>Staked amount</div>
          <div className={'text-[#fff] font-medium'}>
            {ENV == envNane.TESTNET
              ? formatNumber(
                  selectedPool?.id == '6'
                    ? Number(info1 ? (info1 as number[])[0] : 0) / Math.pow(10, 18)
                    : selectedPool?.id == '7'
                      ? Number(info2 ? (info2 as number[])[0] : 0) / Math.pow(10, 18)
                      : Number(info3 ? (info3 as number[])[0] : 0) / Math.pow(10, 18),
                )
              : formatNumber(
                  selectedPool?.id == '2'
                    ? Number(info1 ? (info1 as number[])[0] : 0) / Math.pow(10, 18)
                    : selectedPool?.id == '3'
                      ? Number(info2 ? (info2 as number[])[0] : 0) / Math.pow(10, 18)
                      : Number(info3 ? (info3 as number[])[0] : 0) / Math.pow(10, 18),
                )}{' '}
            UNICE
          </div>
        </div>
        <div className={'flex justify-between'}>
          <div className={'text-[#717681]'}>Staking cap</div>
          <div className={'text-[#fff] font-medium'}>Unlimited</div>
        </div>
        <div className={'flex justify-between'}>
          <div className={'text-[#717681]'}>Duration</div>
          <StakingPoolDuration pools={pools} setPoolSelected={setSelectedPool} />
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
        <Col sm={4} className={'flex items-center font-bold p-6'}>
          <div>{pools?.name}</div>
        </Col>
        <Col sm={2} className={'flex items-center text-center text-xl font-medium p-6'}>
          <div className={'apr-text'}>{selectedPool?.est_apr[0].value}%</div>
        </Col>
        <Col sm={5} className={'flex items-center p-6'}>
          <div>
            <StakingPoolDuration pools={pools} setPoolSelected={setSelectedPool} />
          </div>
        </Col>
        <Col sm={4} className={'flex items-center font-medium p-6'}>
          Unlimited
        </Col>
        <Col sm={5} className={'flex items-center font-medium p-6'}>
          <div>
            {ENV == envNane.TESTNET
              ? formatNumber(
                  selectedPool?.id == '6'
                    ? Number(info1 ? (info1 as number[])[0] : 0) / Math.pow(10, 18)
                    : selectedPool?.id == '7'
                      ? Number(info2 ? (info2 as number[])[0] : 0) / Math.pow(10, 18)
                      : Number(info3 ? (info3 as number[])[0] : 0) / Math.pow(10, 18),
                )
              : formatNumber(
                  selectedPool?.id == '2'
                    ? Number(info1 ? (info1 as number[])[0] : 0) / Math.pow(10, 18)
                    : selectedPool?.id == '3'
                      ? Number(info2 ? (info2 as number[])[0] : 0) / Math.pow(10, 18)
                      : Number(info3 ? (info3 as number[])[0] : 0) / Math.pow(10, 18),
                )}{' '}
            UNICE
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
