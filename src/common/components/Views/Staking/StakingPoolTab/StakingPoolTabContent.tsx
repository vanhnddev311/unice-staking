import StakingPoolItem from '@/common/components/Views/Staking/StakingPoolTab/StakingPoolItem';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Col, Row } from 'antd';
import React from 'react';
import { useAccount } from 'wagmi';

interface Props {
  token: any;
  dataSource: any;
  selectedPool: any;
  selectedDurations: any;
  setShowModalStaking: (val: boolean) => void;
  setSelectedPool: (val: any) => void;
  handleSelectDuration: (poolId: number, duration: any) => void;
  info1: any;
  info2: any;
  info3: any;
}

const StakingPoolTabContent: React.FunctionComponent<Props> = ({
  token,
  dataSource,
  selectedPool,
  selectedDurations,
  setShowModalStaking,
  setSelectedPool,
  handleSelectDuration,
  info1,
  info2,
  info3,
}) => {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  return (
    <div className={'staking-tabs mt-4'}>
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
                  index={index}
                  pools={item}
                  info1={info1}
                  info2={info2}
                  info3={info3}
                  selectedPool={selectedPool}
                  setSelectedPool={setSelectedPool}
                  selectedDurations={selectedDurations}
                  handleSelectDuration={handleSelectDuration}
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
