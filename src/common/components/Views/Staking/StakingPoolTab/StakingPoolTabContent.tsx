import StakingPoolItem from '@/common/components/Views/Staking/StakingPoolTab/StakingPoolItem';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { Col, Row } from 'antd';
import React, { useMemo } from 'react';
import { useAccount } from 'wagmi';

interface Props {
  token: any;
  dataSource: any[];
  selectedItem: any;
  handleSelectItems: (poolName: any, selectedId: any) => void;
  selectedPool: any;
  selectedDurations: any;
  setShowModalStaking: (val: boolean) => void;
  setPoolIndex: (val: any) => void;
  setSelectedPool: (val: any) => void;
  setSelectedParentPool: (val: any) => void;
  handleSelectDuration: (poolId: number, duration: any) => void;
  infoPool: any;
  infoPool2: any;
}

const StakingPoolTabContent: React.FunctionComponent<Props> = ({
  token,
  dataSource,
  selectedItem,
  handleSelectItems,
  selectedPool,
  selectedDurations,
  setShowModalStaking,
  setPoolIndex,
  setSelectedPool,
  setSelectedParentPool,
  handleSelectDuration,
  infoPool,
  infoPool2,
}) => {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();

  const tableData = useMemo(() => {
    return dataSource?.filter((item: any) => item?.pool_name != 'Simple Earn');
  }, [dataSource]);

  return (
    <div className={'staking-tabs mt-4'}>
      <div className={''}>
        <Row className={'hidden sm:flex table-header bg-[#1C1D25]'}>
          <Col sm={4}>Pool</Col>
          <Col sm={4} className={'text-center'}>
            APR
          </Col>
          <Col sm={4} className={'text-center'}>
            Duration (months)
          </Col>
          <Col sm={4}>Staking cap</Col>
          <Col sm={4}>Staked amount</Col>
          <Col sm={4}></Col>
        </Row>
        <div className={'flex flex-col gap-2'}>
          {tableData?.map((item: any, index: number) => {
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
                  setPoolIndex(index);
                  setSelectedParentPool(item);
                  // setShowModalStaking(true);
                }}
              >
                <StakingPoolItem
                  index={index}
                  totalPool={dataSource}
                  pools={item?.est_apr}
                  pool={item}
                  infoPool={infoPool}
                  infoPool2={infoPool2}
                  selectedItem={index == 0 ? selectedItem[0]?.item : selectedItem[1]?.item}
                  selectedPool={selectedPool}
                  setSelectedPool={setSelectedPool}
                  selectedDurations={selectedDurations}
                  handleSelectItems={handleSelectItems}
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
