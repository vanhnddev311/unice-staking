import ModalStaking from '@/common/components/Views/Staking/ModalStaking';
import ModalStakingPools from '@/common/components/Views/Staking/ModalStakingPools';
import ModalUnStaking from '@/common/components/Views/Staking/ModalUnStaking';
import StakingPoolTabContent from '@/common/components/Views/Staking/StakingPoolTab/StakingPoolTabContent';
import StakingReward from '@/common/components/Views/Staking/StakingReward';
import { config } from '@/common/configs/config';
import { contractAddress, ENV, envNane, MAX_INT, tokenAddress } from '@/common/consts';
import abi from '@/common/contracts/abis/contract.json';
import tokenABI from '@/common/contracts/abis/token.json';
import { useModal } from '@/common/hooks/useModal';
import useStaking from '@/common/hooks/useStaking';
import { getPriceOfToken } from '@/common/services/staking';
import { STATUS } from '@/common/types/comon';
import { formatNumber } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { Config, waitForTransactionReceipt } from '@wagmi/core';
import { Popover } from 'antd';
import BigNumber from 'bignumber.js';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import { useAccount, useClient, useReadContract, useReadContracts, useWriteContract } from 'wagmi';

const Staking: React.FunctionComponent = () => {
  const [amountStake, setAmountStake] = useState<string>('');
  const [amountUnStake, setAmountUnStake] = useState<string>('');
  const [currentVotingPower, setCurrentVotingPower] = useState<number>(0);
  const [balanceStaked, setBalanceStaked] = useState();
  const [loadingStaking, setLoadingStaking] = useState(false);

  const [stakedAmount, setStakedAmount] = useState(0);
  const [currentStakedAmount, setCurrentStakedAmount] = useState(0);
  const [reward, setReward] = useState(0);
  const [currentTab, setCurrentTab] = useState(1);
  const [validate, setValidate] = useState('');
  const [isExpired, setIsExpired] = useState(false);
  const [timeExpired, setTimeExpired] = useState('');
  const [stakeStatus, setStakeStatus] = useState<STATUS>(STATUS.PENDING);
  const [unStakeStatus, setUnStakeStatus] = useState<STATUS>(STATUS.PENDING);
  const [unstakeInfo, setUnstakeInfo] = useState<any>({});
  const [errorStake, setErrorStake] = useState('');
  const [veNftMessage, setVeNftMessage] = useState<any>(null);
  const [veNftStatus, setVeNftStatus] = useState<STATUS>(STATUS.PENDING);
  const [errorUnStake, setErrorUnStake] = useState('');
  const [isConfirmUnstake, setIsConfirmUnstake] = useState(false);
  const [parentPool, setParentPool] = useState<any>();
  const [parentAmount, setParentAmount] = useState('' as string);
  const [selectedPool, setSelectedPool] = useState<any>(null);
  const [selectedPoolInfo, setSelectedPoolInfo] = useState<any>();

  const { show: showModalStaking, setShow: setShowModalStaking, toggle: toggleShowModalStaking } = useModal();
  const { show: showStake, setShow: setShowStake, toggle: toggleShowStake } = useModal();
  const { show: showUnStake, setShow: setShowUnStake, toggle: toggleShowUnStake } = useModal();
  const { data: hash, writeContractAsync } = useWriteContract();
  const { address } = useAccount();

  const { stakeInfo, poolInfo, balance } = useStaking();
  const client = useClient();

  useEffect(() => {
    if (!showModalStaking) {
      setSelectedPool(null);
      setAmountStake('');
      setAmountUnStake('');
    }
  }, [showModalStaking]);

  const stakeToken1: Token = {
    name: 'UNICE',
    price: 0.004,
    icon_uri: 'UNICE',
    symbol: 'UNICE',
    address: ``,
    peg: 10,
    decimals: 6,
    type: 'COIN',
  };

  const { data: vipLevels } = useQuery(['vipLevel'], async () => {
    return [];
  });

  const { data: allowanceAmt, refetch: refetchAllowance } = useReadContract({
    abi: tokenABI,
    address: tokenAddress,
    functionName: 'allowance',
    args: [address, contractAddress],
    chainId: client?.chain?.id ?? 1,
  });

  const { data: infoPool1 } = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'userInfo',
    args: [ENV == envNane.TESTNET ? 6 : 2, address],
    chainId: client?.chain?.id ?? 1,
  });

  const { data: infoPool2 } = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'userInfo',
    args: [ENV == envNane.TESTNET ? 7 : 3, address],
    chainId: client?.chain?.id ?? 1,
  });

  const { data: infoPool3 } = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'userInfo',
    args: [ENV == envNane.TESTNET ? 8 : 4, address],
    chainId: client?.chain?.id ?? 1,
  });

  const { data: pendingReward } = useReadContract({
    abi,
    address: contractAddress,
    functionName: 'pendingReward',
    args: [selectedPool?.id, address],
    chainId: client?.chain?.id ?? 1,
  });

  const { data } = useReadContracts({
    contracts: [
      {
        abi,
        address: contractAddress,
        functionName: 'pendingReward',
        args: [ENV == envNane.TESTNET ? 6 : 2, address],
        chainId: client?.chain?.id ?? 1,
      },
      {
        abi,
        address: contractAddress,
        functionName: 'pendingReward',
        args: [ENV == envNane.TESTNET ? 7 : 3, address],
        chainId: client?.chain?.id ?? 1,
      },
      {
        abi,
        address: contractAddress,
        functionName: 'pendingReward',
        args: [ENV == envNane.TESTNET ? 8 : 4, address],
        chainId: client?.chain?.id ?? 1,
      },
    ],
  });

  const [reward1, reward2, reward3] = data || [];

  const totalReward = useMemo(() => {
    return Number(reward1?.result ?? 0) + Number(reward2?.result ?? 0) + Number(reward3?.result ?? 0);
  }, [reward1, reward2, reward3]);

  useEffect(() => {
    if (!!infoPool1 && !!infoPool2 && !!infoPool3) {
      setStakedAmount(
        Number((infoPool1 as number[])[0]) + Number((infoPool2 as number[])[0]) + Number((infoPool3 as number[])[0]),
      );
      setReward(
        Number((infoPool1 as number[])[1]) + Number((infoPool2 as number[])[1]) + Number((infoPool3 as number[])[1]),
      );
    }
  }, [infoPool1, infoPool2, infoPool3]);

  useEffect(() => {
    if (!address) setStakedAmount(0);
    if (!!infoPool1 && !!infoPool2 && !!infoPool3) {
      ENV == envNane.TESTNET
        ? setCurrentStakedAmount(
            selectedPool?.id == '6'
              ? Number((infoPool1 as number[])[0] ?? 0)
              : selectedPool?.id == '7'
                ? Number((infoPool2 as number[])[0] ?? 0)
                : Number((infoPool3 as number[])[0] ?? 0),
          )
        : setCurrentStakedAmount(
            selectedPool?.id == '2'
              ? Number((infoPool1 as number[])[0] ?? 0)
              : selectedPool?.id == '3'
                ? Number((infoPool2 as number[])[0] ?? 0)
                : Number((infoPool3 as number[])[0] ?? 0),
          );
    }
  }, [infoPool1, infoPool2, infoPool3, selectedPool, address]);

  const onChangeAmountStake = (value: string) => {
    setValidate('');
    setAmountStake(value);
  };

  const onChangeAmountUnStake = (value: string) => {
    setValidate('');
    setAmountUnStake(value);
  };

  const validateAmountStake = () => {
    let isSuccess = false;
    console.log('balance', balance);
    if (!amountStake || Number(amountStake) === 0) {
      setValidate('Amount is required!');
      isSuccess = false;
    } else if (Number(amountStake) > Number(balance)) {
      setValidate('Insufficient balance!');
      isSuccess = false;
    } else if (Number(amountStake) < 1) {
      setValidate('You can only stake a minimum of 1 UNICE');
      isSuccess = false;
    } else {
      setValidate('');
      isSuccess = true;
    }
    return isSuccess;
  };

  const validateAmountUnStake = () => {
    let isSuccess = false;
    if (!amountUnStake || Number(amountUnStake) === 0) {
      setValidate('Amount is required!');
      isSuccess = false;
    } else if (Number(amountUnStake) > Number(balanceStaked)) {
      setValidate('Insufficient balance!');
      isSuccess = false;
    } else {
      setValidate('');
      isSuccess = true;
    }
    return isSuccess;
  };

  const stakeAction = async (pool: any) => {
    if (Number(amountStake) > Number(allowanceAmt)) {
      const hash = await writeContractAsync({
        address: tokenAddress,
        abi: tokenABI,
        functionName: 'approve',
        args: [contractAddress, MAX_INT],
        chainId: client?.chain?.id ?? 1,
      });

      const data = await waitForTransactionReceipt(config as Config, {
        hash: hash,
        confirmations: 3,
      });
      await refetchAllowance();
    }

    const res = await writeContractAsync({
      address: contractAddress,
      abi,
      functionName: 'stake',
      args: [pool?.id ?? 2, BigNumber(Number(Number(amountStake).toFixed(5)) * 10 ** 18).toFixed()],
      chainId: client?.chain?.id ?? 1,
    });

    const transactionReceipt = await waitForTransactionReceipt(config as Config, {
      hash: res,
    });
  };

  const handleStake = async (pool: any) => {
    if (!validateAmountStake()) return;
    setLoadingStaking(true);
    setStakeStatus(STATUS.PENDING);
    setShowStake(true);

    try {
      await stakeAction(pool);
      setStakeStatus(STATUS.SUCCESS);
    } catch (e: any) {
      setStakeStatus(STATUS.FAIL);
      setErrorStake(e.message);
      console.log(e);
    } finally {
      setLoadingStaking(false);
      // setShowStake(false);
    }
  };

  const handleUnStakeConfirm = async () => {
    setLoadingStaking(true);
    setUnStakeStatus(STATUS.PENDING);
    setShowUnStake(true);
    try {
      const hash = await writeContractAsync({
        address: contractAddress,
        abi,
        functionName: 'unStake',
        args: [parentPool?.id ?? 2, BigNumber(amountUnStake).times(BigNumber(10).pow(18)).toString()],
        chainId: client?.chain?.id ?? 1,
      });

      // const { hash, result } = await run(unstakePayload);
      setUnstakeInfo({
        amount: Number(parentAmount),
        reward: 0,
        hash,
      });
      setUnStakeStatus(STATUS.SUCCESS);
      setShowUnStake(true);
    } catch (e: any) {
      setVeNftMessage('Something went wrong');
      setVeNftStatus(STATUS.FAIL);
      setIsConfirmUnstake(false);
      setShowUnStake(false);
      console.log(e);
    } finally {
      setLoadingStaking(false);
      setShowModalStaking(false);
    }
  };

  const handleUnStake = async (amount: any, pool: any) => {
    setParentPool(pool);
    setParentAmount(amount);
    if (!validateAmountUnStake()) return;
    if (!isExpired) {
      setUnStakeStatus(STATUS.FAIL);
      setShowUnStake(true);
    } else {
      setUnStakeStatus(STATUS.WARNING);
      setShowUnStake(true);
    }
  };

  // const { data: filterPoolInfo = [] } = useQuery(
  //   ['filterPoolInfo', poolInfo],
  //   async () => {
  //     if (!poolInfo) return;
  //     const listChildPool = poolInfo?.items;
  //     const updatedPoolInfo: any = [];
  //     for (const pool of listChildPool) {
  //       try {
  //         // if (!!infoPool1 && !!infoPool2) {
  //         updatedPoolInfo.push({ ...pool });
  //         // const stakedAmount =
  //         //   pool?.id == '0' ? Number((infoPool1 as number[])[0]) : Number((infoPool2 as number[])[0]);
  //         // }
  //       } catch (error) {
  //         console.error('Error fetching staked amount for pool:', error);
  //       }
  //     }
  //
  //     return updatedPoolInfo;
  //   },
  //   {
  //     // enabled: !!poolInfo && !!infoPool1 && !!infoPool2,
  //   },
  // );

  const { data: tokenPrice } = useQuery(['tokenPrice'], async () => {
    const res = await getPriceOfToken();
    return res.data[0];
  });

  const title = 'UNICE Staking';
  const description = 'UNICE Staking';

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        additionalMetaTags={[{ name: 'og:image:alt', content: 'UNICE Staking' }]}
        openGraph={{
          title,
          description,
          siteName: ' UNICE Staking',
          url: '',
          images: [{ url: '' }],
          type: 'website',
        }}
      />
      <section className={'text-white relative pt-8 mt-20 pb-[200px] sm:pb-[240px]'}>
        <div className={'container flex flex-col mx-auto max-w-[1440px] md:mt-0 px-3 gap-6 sm:gap-16'}>
          <div className={'flex flex-col items-center gap-4'}>
            <div className={'text-title text-5xl font-medium'}>Staking</div>
            <div className={'text-[#FFFFFFB2] text-base text-center'}>Stake, Earn, and Grow with blockchain.</div>
          </div>
          <div className={'flex flex-col md:flex-row md:items-center gap-6'}>
            <div
              className={
                'relative bg-staking-1 w-full h-[140px] rounded-[16px] flex items-center gap-4 p-6 sm:px-10 sm:py-6 overflow-hidden'
              }
            >
              <Image
                src={require('@/common/assets/images/staking/bg-staking-item-1.png')}
                alt={''}
                className={'w-[92px] sm:w-[154px] absolute bottom-[-12px] sm:bottom-0 right-[24%]'}
              />
              <Image
                src={require('@/common/assets/images/staking/bg-staking-item-2.png')}
                alt={''}
                className={'absolute top-0 right-[12%]'}
              />
              <Image
                src={require('@/common/assets/images/staking/bg-staking-item-3.png')}
                alt={''}
                className={'w-[68px] sm:w-auto absolute bottom-0 right-[-20px] sm:right-0'}
              />
              <div className={'flex items-end gap-10'}>
                <div>
                  <div className={'flex items-center gap-2'}>
                    <Image
                      src={require('@/common/assets/images/staking/unice-logo 1.png')}
                      alt={''}
                      className={'w-[68px]'}
                    />
                    <div className={'w-[1px] h-[10px]'} style={{ background: 'rgba(255, 255, 255, 0.40)' }}></div>
                    <div>Staking</div>
                  </div>
                  <div>
                    <div className={'apr-text text-2xl font-semibold mt-2'}>APR up to 60%</div>
                    <div className={'text-base sm:text-lg text-[#99BCDD] mt-1'}>The first step of UNICE 2.0</div>
                  </div>
                </div>
                {/*<div*/}
                {/*  onClick={() => setShowModalStaking(true)}*/}
                {/*  className={'stake-btn h-[36px] text-[#fff] border-none cursor-pointer'}*/}
                {/*>*/}
                {/*  STAKE NOW*/}
                {/*</div>*/}
              </div>
            </div>
            <div
              className={
                'w-full sm:h-[140px] flex flex-col sm:flex-row sm:items-center rounded-[16px] bg-[#1C1D25] p-4 sm:p-8'
              }
            >
              <div className={'w-full flex justify-center'}>
                <div className={'flex flex-col text-[#717681] gap-4'}>
                  <div>UNICE Staked</div>
                  <div className={'flex items-center gap-2'}>
                    <Image
                      src={require('@/common/assets/images/unice-logo-icon.png')}
                      alt={''}
                      className={'w-[24px]'}
                    />
                    <div className={'text-[#fff] text-2xl font-medium leading-[125%]'}>
                      {formatNumber(stakedAmount / Math.pow(10, 18), 4)} UNICE
                    </div>
                    {/*<div className={'mt-2'}>*/}
                    {/*  Interest:{' '}*/}
                    {/*  <span className={'text-[#10DE4A]'}>+{formatNumber(totalReward / Math.pow(10, 18), 4)} UNICE</span>*/}
                    {/*</div>*/}
                  </div>
                </div>
              </div>
              <div className={'px-4 sm:px-8'}>
                <div className={'w-full sm:w-[1px] h-[1px] sm:h-[24px] bg-[#FFFFFF1A]'}></div>
              </div>
              <div className={'w-full flex justify-center'}>
                <div className={'flex flex-col text-[#717681] gap-4'}>
                  <div>Staking Rewards</div>
                  <Popover content={<StakingReward />} title="Staking reward">
                    <div className={'relative w-fit apr-text text-2xl font-medium leading-[125%] cursor-pointer'}>
                      {formatNumber(stakedAmount / Math.pow(10, 18), 4)} USDT
                      <Image
                        src={require('@/common/assets/images/staking/Line 32.png')}
                        alt={''}
                        className={'absolute w-full'}
                      />
                    </div>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
          <StakingPoolTabContent
            token={stakeToken1}
            dataSource={poolInfo}
            selectedPool={selectedPool}
            setShowModalStaking={setShowModalStaking}
            setSelectedPool={setSelectedPool}
            info1={infoPool1}
            info2={infoPool2}
            info3={infoPool3}
          />
        </div>

        {/*<ModalStakingPools*/}
        {/*  isModalOpen={!!showModalStaking}*/}
        {/*  loading={loadingStaking}*/}
        {/*  stakeInfo={stakeInfo as any}*/}
        {/*  poolInfo={filterPoolInfo as any}*/}
        {/*  userPoolInfo={[infoPool1, infoPool2, infoPool3] as any}*/}
        {/*  validate={validate}*/}
        {/*  amountStake={amountStake}*/}
        {/*  amountUnStake={amountUnStake}*/}
        {/*  handleStake={handleStake}*/}
        {/*  handleUnStake={handleUnStake}*/}
        {/*  handleClose={toggleShowModalStaking}*/}
        {/*  stakeToken={stakeToken1!}*/}
        {/*  stakedAmount={stakedAmount}*/}
        {/*  balance={balance}*/}
        {/*  balanceStaked={currentStakedAmount}*/}
        {/*  setBalanceStaked={setBalanceStaked}*/}
        {/*  timeExpired={timeExpired}*/}
        {/*  isExpired={isExpired}*/}
        {/*  setIsExpired={setIsExpired}*/}
        {/*  setTimeExpired={setTimeExpired}*/}
        {/*  setValidate={setValidate}*/}
        {/*  setPoolSelected={setSelectedPoolInfo}*/}
        {/*  onChangeAmountStake={onChangeAmountStake}*/}
        {/*  onChangeAmountUnStake={onChangeAmountUnStake}*/}
        {/*  selectedPool={selectedPool}*/}
        {/*  setSelectedPool={setSelectedPool}*/}
        {/*/>*/}
        <ModalStaking
          amount={Number(amountStake)}
          status={stakeStatus}
          show={showStake}
          error={errorStake}
          toggle={toggleShowStake}
          setShow={setShowStake}
        />
        <ModalUnStaking
          unstakeInfo={unstakeInfo}
          isExpired={isExpired}
          timeExpired={timeExpired}
          status={unStakeStatus}
          show={showUnStake}
          error={errorUnStake}
          toggle={toggleShowUnStake}
          setIsConfirmUnstake={setIsConfirmUnstake}
          setShow={setShowUnStake}
          confirmUnstake={handleUnStakeConfirm}
        />
      </section>
    </>
  );
};

export default Staking;
