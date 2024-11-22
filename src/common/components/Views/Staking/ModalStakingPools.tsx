import StakingTab from '@/common/components/Views/Staking/StakingTab';
import UnStakingTab from '@/common/components/Views/Staking/UnStakingTab';
import { CloseIcon } from '@/common/components/icon/common';
import { Col, Modal, Row, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';

interface Props {
  isModalOpen: boolean;
  loading: boolean;
  stakeInfo: any;
  poolInfo: any;
  amountStake: string;
  amountUnStake: string;
  validate: string;
  balance: number | string | any;
  balanceStaked: number | string | any;
  setBalanceStaked: (value: any) => void;
  stakeToken: Token;
  stakedAmount: number;
  timeExpired: any;
  isExpired: boolean;
  setIsExpired: (value: boolean) => void;
  setTimeExpired: (value: string) => void;
  setValidate: (value: string) => void;
  setPoolSelected: (value: any) => void;
  onChangeAmountStake: (value: string) => void;
  onChangeAmountUnStake: (value: string) => void;
  handleStake: (pool: any) => void;
  handleUnStake: (amount: number, pool: any) => void;
  handleClose: () => void;
  selectedPool: any;
  setSelectedPool: (val: any) => void;
}

const ModalStakingPools: React.FunctionComponent<Props> = ({
  isModalOpen,
  loading,
  stakeInfo,
  poolInfo,
  amountStake,
  amountUnStake,
  validate,
  balance,
  balanceStaked,
  setBalanceStaked,
  stakeToken,
  stakedAmount,
  timeExpired,
  setIsExpired,
  setTimeExpired,
  setValidate,
  setPoolSelected,
  onChangeAmountStake,
  onChangeAmountUnStake,
  handleStake,
  handleUnStake,
  handleClose,
  selectedPool,
  setSelectedPool,
}) => {
  const [tabStaking, setTabStaking] = useState<string>('1');
  const [poolAddress, setPoolAdress] = useState<string>('');
  const [poolSelectedInfo, setPoolSelectedInfo] = useState<PollInfo>(poolInfo[0]);
  const [stakeInfoOfPoolSelected, setStakeInfoOfPoolSelected] = useState<StakeInfo>();

  useEffect(() => {
    if (poolInfo) {
      if (!selectedPool) {
        setPoolAdress(poolInfo[0]?.contract_address);
      } else {
        setPoolAdress(selectedPool.contract_address);
      }
    }
  }, [poolInfo, selectedPool]);

  useEffect(() => {
    if (!isModalOpen) {
      setPoolAdress(poolInfo[0]?.contract_address);
      setStakeInfoOfPoolSelected(stakeInfo?.stakePool91Info);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (poolAddress === poolInfo[0]?.contract_address) {
      setPoolSelectedInfo(poolInfo?.find((pool: any) => pool.contract_address === poolInfo[0]?.contract_address));
      setPoolSelected(poolInfo?.find((pool: any) => pool.contract_address === poolInfo[0]?.contract_address));
      setStakeInfoOfPoolSelected(stakeInfo?.stakePool91Info);
    } else {
      setPoolSelectedInfo(poolInfo?.find((pool: any) => pool.contract_address === selectedPool?.contract_address));
      setPoolSelected(poolInfo?.find((pool: any) => pool.contract_address === selectedPool?.contract_address));
      setStakeInfoOfPoolSelected(stakeInfo?.stakePool182Info);
    }
  }, [poolInfo, poolAddress]);

  return (
    <Modal
      className={'modal-customize'}
      centered
      open={isModalOpen}
      footer={false}
      title={''}
      width={480}
      onCancel={() => {
        handleClose();
        setTabStaking('1');
      }}
      closable={false}
    >
      <Row gutter={[40, 0]}>
        {/*<Col xs={24} sm={11}>*/}
        {/*  <StakingDetails*/}
        {/*    loading={loading}*/}
        {/*    vipLevel={currentVipTier}*/}
        {/*    balanceStaked={balanceStaked}*/}
        {/*    stakeInfo={stakeInfo as StakeInfo}*/}
        {/*    poolInfo={poolInfo as PollInfo}*/}
        {/*  />*/}
        {/*</Col>*/}
        <Col xs={24} className={'w-full'}>
          <div className={'flex justify-between items-center mb-6'}>
            <div className={'text-3xl font-semibold'}>Staking pools</div>
            <div onClick={handleClose} className={'bg-[#14141A] rounded-full p-2 cursor-pointer'}>
              <CloseIcon />
            </div>
          </div>
          <div className={'flex items-center bg-[#101119] rounded-[12px] gap-1 p-1 mb-6'}>
            <div
              onClick={() => setTabStaking('1')}
              className={`w-full h-[36px] flex justify-center items-center rounded-[8px] ${tabStaking == '1' ? 'bg-[#DCE1FE1A]' : 'bg-transparent'}`}
            >
              Stake
            </div>
            <div
              onClick={() => setTabStaking('2')}
              className={`w-full h-[36px] flex justify-center items-center rounded-[8px] ${tabStaking == '2' ? 'bg-[#DCE1FE1A]' : 'bg-transparent'}`}
            >
              Unstake
            </div>
          </div>
          {tabStaking == '1' ? (
            <StakingTab
              loading={loading}
              stakeInfo={stakeInfoOfPoolSelected!}
              amount={amountStake}
              listPool={poolInfo}
              poolInfo={poolSelectedInfo!}
              // setPoolSelected={setPoolSelected}
              poolAddress={poolAddress}
              setPoolAddress={setPoolAdress}
              validate={validate}
              setValidate={setValidate}
              balance={balance}
              stakeToken={stakeToken}
              onChangeAmount={onChangeAmountStake}
              handleStake={handleStake}
              setSelectedPool={setSelectedPool}
            />
          ) : (
            <UnStakingTab
              loading={loading}
              stakeInfo={stakeInfoOfPoolSelected!}
              listPool={poolInfo}
              poolInfo={poolSelectedInfo!}
              poolAddress={poolAddress}
              setPoolAddress={setPoolAdress}
              amount={amountUnStake}
              validate={validate}
              subTitle={'Staked amount'}
              balance={balanceStaked}
              setBalanceStaked={setBalanceStaked}
              stakeToken={stakeToken}
              stakedAmount={stakedAmount}
              timeExpired={timeExpired}
              setIsExpired={setIsExpired}
              setTimeExpired={setTimeExpired}
              setValidate={setValidate}
              onChangeAmount={onChangeAmountUnStake}
              handleUnStake={handleUnStake}
              setSelectedPool={setSelectedPool}
            />
          )}
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalStakingPools;
