import ModalStaking from '@/common/components/Views/Staking/ModalStaking';
import ModalStakingPools from '@/common/components/Views/Staking/ModalStakingPools';
import ModalUnStaking from '@/common/components/Views/Staking/ModalUnStaking';
import Referral from '@/common/components/Views/Staking/Referral';
import StakingPoolTabContent from '@/common/components/Views/Staking/StakingPoolTab/StakingPoolTabContent';
import StakingReward from '@/common/components/Views/Staking/StakingReward';
import { config } from '@/common/configs/config';
import { contractAddress, contractFrensAddress, ENV, envNane, MAX_INT, tokenAddress } from '@/common/consts';
import { default as abi, default as frensAbi } from '@/common/contracts/abis/contract.json';
import tokenABI from '@/common/contracts/abis/token.json';
import { useModal } from '@/common/hooks/useModal';
import useStaking from '@/common/hooks/useStaking';
import { AppContext } from '@/common/providers/contexts';
import { getPoolInfo, getPriceOfFrensToken, getPriceOfToken, postStakingData } from '@/common/services/staking';
import { STATUS } from '@/common/types/comon';
import { formatNumber, formatRewardBalance } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { Config, waitForTransactionReceipt } from '@wagmi/core';
import { Popover } from 'antd';
import BigNumber from 'bignumber.js';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useAccount, useClient, useReadContract, useReadContracts, useWriteContract } from 'wagmi';

const Staking: React.FunctionComponent = () => {
  const [amountStake, setAmountStake] = useState<string>('');
  const [amountUnStake, setAmountUnStake] = useState<string>('');
  const [balanceStaked, setBalanceStaked] = useState();
  const [loadingStaking, setLoadingStaking] = useState(false);

  const [stakedAmount, setStakedAmount] = useState(0);
  const [currentStakedAmount, setCurrentStakedAmount] = useState(0);
  const [currentTab, setCurrentTab] = useState(1);
  const [validate, setValidate] = useState('');
  const [isExpired, setIsExpired] = useState(false);
  const [timeExpired, setTimeExpired] = useState('');
  const [stakeStatus, setStakeStatus] = useState<STATUS>(STATUS.PENDING);
  const [unStakeStatus, setUnStakeStatus] = useState<STATUS>(STATUS.PENDING);
  const [unstakeInfo, setUnstakeInfo] = useState<any>({});
  const [errorStake, setErrorStake] = useState('');
  const [errorUnStake, setErrorUnStake] = useState('');
  const [poolIndex, setPoolIndex] = useState<any>();
  const [parentPool, setParentPool] = useState<any>();
  const [parentAmount, setParentAmount] = useState('' as string);
  const [selectedPool, setSelectedPool] = useState<any>(null);
  const [selectedParentPool, setSelectedParentPool] = useState<any>(null);
  const [selectedDurations, setSelectedDurations] = useState({});

  const { userInfo } = useContext(AppContext);
  const { show: showModalStaking, setShow: setShowModalStaking, toggle: toggleShowModalStaking } = useModal();
  const { show: showStake, setShow: setShowStake, toggle: toggleShowStake } = useModal();
  const { show: showUnStake, setShow: setShowUnStake, toggle: toggleShowUnStake } = useModal();
  const { data: hash, writeContractAsync } = useWriteContract();
  const { address } = useAccount();
  const { stakeInfo, poolInfo, balance } = useStaking();
  const client = useClient();

  const [selectedItems, setSelectedItems] = useState<any>();

  useEffect(() => {
    if (!showModalStaking) {
      // setSelectedPool(null);
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

  const { data: poolInfo1 = [] } = useQuery(['poolInfo1'], async () => {
    const res = await getPoolInfo();
    return res?.Data;
  });

  useEffect(() => {
    setSelectedItems(
      poolInfo1?.map((pool: any) => ({
        pool_name: pool.pool_name,
        item: pool.est_apr[0],
      })),
    );
  }, [poolInfo1]);

  const { data: allowanceAmt, refetch: refetchAllowance } = useReadContract({
    abi: tokenABI,
    address: tokenAddress,
    functionName: 'allowance',
    args: [address, contractAddress],
    chainId: client?.chain?.id ?? 1,
  });

  const { data: allowanceFrensAmt, refetch: refetchAllowanceFrens } = useReadContract({
    abi: tokenABI,
    address: tokenAddress,
    functionName: 'allowance',
    args: [address, contractFrensAddress],
    chainId: client?.chain?.id ?? 1,
  });

  const { data: infoPool, refetch: refetchDataPool1 } = useReadContracts({
    contracts: [
      {
        abi,
        address: contractAddress,
        functionName: 'userInfo',
        args: [ENV == envNane.TESTNET ? 6 : 2, address],
        chainId: client?.chain?.id ?? 1,
      },
      {
        abi,
        address: contractAddress,
        functionName: 'userInfo',
        args: [ENV == envNane.TESTNET ? 7 : 3, address],
        chainId: client?.chain?.id ?? 1,
      },
      {
        abi,
        address: contractAddress,
        functionName: 'userInfo',
        args: [ENV == envNane.TESTNET ? 8 : 4, address],
        chainId: client?.chain?.id ?? 1,
      },
    ],
  });

  const { data: infoPool2, refetch: refetchDataPool2 } = useReadContracts({
    contracts: [
      {
        abi,
        address: contractFrensAddress,
        functionName: 'userInfo',
        args: [ENV == envNane.TESTNET ? 3 : 0, address],
        chainId: client?.chain?.id ?? 1,
      },
      {
        abi,
        address: contractFrensAddress,
        functionName: 'userInfo',
        args: [ENV == envNane.TESTNET ? 4 : 1, address],
        chainId: client?.chain?.id ?? 1,
      },
      // {
      //   abi,
      //   address: contractFrensAddress,
      //   functionName: 'userInfo',
      //   args: [ENV == envNane.TESTNET ? 5 : 4, address],
      //   chainId: client?.chain?.id ?? 1,
      // },
    ],
  });

  useEffect(() => {
    if (address) {
      refetchDataPool1();
      refetchDataPool2();
      console.log('refetched');
    }
  }, [address]);

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

  const { data: rewardFrens } = useReadContracts({
    contracts: [
      {
        abi: frensAbi,
        address: contractFrensAddress,
        functionName: 'pendingReward',
        args: [ENV == envNane.TESTNET ? 3 : 2, address],
        chainId: client?.chain?.id ?? 1,
      },
      {
        abi: frensAbi,
        address: contractFrensAddress,
        functionName: 'pendingReward',
        args: [ENV == envNane.TESTNET ? 4 : 3, address],
        chainId: client?.chain?.id ?? 1,
      },
      {
        abi: frensAbi,
        address: contractFrensAddress,
        functionName: 'pendingReward',
        args: [ENV == envNane.TESTNET ? 5 : 4, address],
        chainId: client?.chain?.id ?? 1,
      },
    ],
  });

  const [reward1, reward2, reward3] = data || [];
  const [rewardFrens1, rewardFrens2, rewardFrens3] = rewardFrens || [];

  const totalReward = useMemo(() => {
    return (
      Number(reward1?.result ?? 0) +
      Number(reward2?.result ?? 0) +
      Number(reward3?.result ?? 0) +
      Number(rewardFrens1?.result ?? 0) +
      Number(rewardFrens2?.result ?? 0) +
      Number(rewardFrens3?.result ?? 0)
    );
  }, [reward1, reward2, reward3, rewardFrens1, rewardFrens2, rewardFrens3]);

  useEffect(() => {
    if (!infoPool) {
      console.error('infoPool is undefined');
      return;
    } else if (!infoPool2) {
      console.error('infoPool2 is undefined');
      return;
    }

    if (infoPool.some((pool) => !pool || !pool.result) || infoPool2.some((pool) => !pool || !pool.result)) {
      console.error('Some pools are undefined or missing result:', infoPool);
      return;
    }
  }, [infoPool, infoPool2]);

  useEffect(() => {
    if (infoPool && infoPool2) {
      const stakedAmounts = infoPool.map((pool) => (pool?.result ? Number((pool.result as number[])[0]) : 0));
      const stakedFrensAmounts = infoPool2.map((pool) => (pool?.result ? Number((pool.result as number[])[0]) : 0));
      setStakedAmount(
        stakedAmounts.reduce((total, amount) => total + amount, 0) +
          stakedFrensAmounts.reduce((total, amount) => total + amount, 0),
      );
    }
  }, [infoPool, infoPool2]);

  useEffect(() => {
    if (!address) {
      setStakedAmount(0);
      return;
    }

    if (infoPool && selectedPool?.id) {
      const poolIndex =
        ENV === envNane.TESTNET
          ? selectedPool.id === '6'
            ? 0
            : selectedPool.id === '7'
              ? 1
              : 2
          : selectedPool.id === '2'
            ? 0
            : selectedPool.id === '3'
              ? 1
              : 2;

      const poolResult = infoPool[poolIndex]?.result as number[];

      if (poolResult) {
        setCurrentStakedAmount(Number(poolResult[0] ?? 0));
      } else {
        console.warn(`infoPool[${poolIndex}] is undefined or has no result`);
        setCurrentStakedAmount(0);
      }
    }
  }, [infoPool, selectedPool, address]);

  const handleSelectDuration = (poolIndex: number, duration: any) => {
    setSelectedDurations((prev) => ({ ...prev, [poolIndex]: duration }));
  };

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
    if (!amountStake || Number(amountStake) === 0) {
      setValidate('Amount is required!');
      isSuccess = false;
    } else if (Number(amountStake) > Number(balance)) {
      setValidate('Insufficient balance!');
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
    if (
      (poolIndex == 1 && Number(amountStake) > Number(allowanceAmt)) ||
      (poolIndex == 0 && Number(amountStake) > Number(allowanceFrensAmt))
    ) {
      const hash = await writeContractAsync({
        address: tokenAddress,
        abi: tokenABI,
        functionName: 'approve',
        args: [poolIndex == 1 ? contractAddress : contractFrensAddress, MAX_INT],
        chainId: client?.chain?.id ?? 1,
      });

      const data = await waitForTransactionReceipt(config as Config, {
        hash: hash,
        confirmations: 3,
      });
      await refetchAllowance();
      await refetchAllowanceFrens();
    }

    const res = await writeContractAsync({
      address: poolIndex == 1 ? contractAddress : contractFrensAddress,
      abi: poolIndex == 1 ? abi : frensAbi,
      functionName: 'stake',
      args: [pool?.id ?? 2, BigNumber(Number(Number(amountStake).toFixed(5)) * 10 ** 18).toFixed()],
      chainId: client?.chain?.id ?? 1,
    });

    const transactionReceipt = await waitForTransactionReceipt(config as Config, {
      hash: res,
    });
    return res;
  };

  const handleStake = async (pool: any, poolId: string) => {
    if (!validateAmountStake()) return;
    setLoadingStaking(true);
    setStakeStatus(STATUS.PENDING);
    setShowStake(true);

    try {
      const hash = await stakeAction(pool);
      await postStakingData({
        pool_id: poolId?.toString(),
        wallet: address,
        amount: amountStake,
        tx_hash: hash,
      });
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

  const handleSelectItems = (poolName: any, selectedId: any) => {
    setSelectedItems((prevSelected: any) =>
      prevSelected.map((selected: any) =>
        selected.pool_name == poolName
          ? {
              ...selected,
              item: poolInfo1
                .find((pool: any) => pool.pool_name == poolName)
                ?.est_apr.find((apr: any) => apr.id == selectedId),
            }
          : selected,
      ),
    );
  };

  const { data: filterPoolInfo = [] } = useQuery(
    ['filterPoolInfo', poolInfo],
    async () => {
      if (!poolInfo) return;
      const listChildPool = poolInfo;
      const updatedPoolInfo: any = [];
      for (const pool of listChildPool) {
        try {
          // if (!!infoPool1 && !!infoPool2) {
          updatedPoolInfo.push({ ...pool });
          // const stakedAmount =
          //   pool?.id == '0' ? Number((infoPool1 as number[])[0]) : Number((infoPool2 as number[])[0]);
          // }
        } catch (error) {
          console.error('Error fetching staked amount for pool:', error);
        }
      }

      return updatedPoolInfo;
    },
    {
      // enabled: !!poolInfo && !!infoPool1 && !!infoPool2,
    },
  );

  const { data: { priceInfo, tokenPrice = 0, frensPrice = 0.012 } = {} } = useQuery(
    ['tokenPrice'],
    async () => {
      const unicePrice = await getPriceOfToken();
      console.log('frensPrice', frensPrice);
      return { priceInfo: unicePrice.data[0], tokenPrice: Number(unicePrice.data[0].lastPr), frensPrice: 0.012 };
    },
    {
      refetchInterval: 10000,
    },
  );

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
                'w-full sm:h-[140px] flex flex-col sm:flex-row sm:items-center rounded-[16px] bg-[#1C1D25] p-4 sm:p-8 gap-6 sm:gap-0'
              }
            >
              {/*<div className={'w-full flex sm:justify-center'}>*/}
              {/*  <div*/}
              {/*    className={*/}
              {/*      'w-full flex sm:flex-col justify-between sm:justify-start items-center text-[#717681] gap-4'*/}
              {/*    }*/}
              {/*  >*/}
              {/*    <div>Your rank</div>*/}
              {/*    <div className={'text-[#fff] text-base sm:text-2xl font-medium leading-[125%]'}>*/}
              {/*      {userInfo?.rank ? `#${userInfo.rank}` : '--'}*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}
              {/*<div className={'hidden sm:block px-4'}>*/}
              {/*  <div className={'w-full sm:w-[1px] h-[1px] sm:h-[24px] bg-[#FFFFFF1A]'}></div>*/}
              {/*</div>*/}
              <div className={'w-full flex sm:justify-center'}>
                <div
                  className={
                    'w-full flex sm:flex-col justify-between sm:justify-start items-center text-[#717681] gap-4'
                  }
                >
                  <div>UNICE Staked</div>
                  <div className={'flex items-center gap-2'}>
                    <Image
                      src={require('@/common/assets/images/unice-logo-icon.png')}
                      alt={''}
                      className={'w-[24px]'}
                    />
                    <div className={'text-center text-[#fff] text-base sm:text-2xl font-medium leading-[125%]'}>
                      {formatNumber(stakedAmount / Math.pow(10, 18), 4)} UNICE
                    </div>
                    {/*<div className={'mt-2'}>*/}
                    {/*  Interest:{' '}*/}
                    {/*  <span className={'text-[#10DE4A]'}>+{formatNumber(totalReward / Math.pow(10, 18), 4)} UNICE</span>*/}
                    {/*</div>*/}
                  </div>
                </div>
              </div>
              <div className={'hidden sm:block px-4'}>
                <div className={'w-full sm:w-[1px] h-[1px] sm:h-[24px] bg-[#FFFFFF1A]'}></div>
              </div>
              <div className={'w-full flex sm:justify-center'}>
                <div className={'w-full flex sm:flex-col justify-between sm:justify-start items-center gap-4'}>
                  <div>Staking Rewards</div>
                  <Popover
                    content={
                      <StakingReward
                        rewardPool1={
                          (Number(reward1?.result ?? 0) + Number(reward2?.result ?? 0) + Number(reward3?.result ?? 0)) /
                          Math.pow(10, 18)
                        }
                        rewardPool2={
                          (Number(rewardFrens1?.result ?? 0) +
                            Number(rewardFrens2?.result ?? 0) +
                            Number(rewardFrens3?.result ?? 0)) /
                          Math.pow(10, 18)
                        }
                        tokenPrice={tokenPrice}
                        frensPrice={frensPrice}
                      />
                    }
                    title="Staking reward"
                  >
                    <div
                      className={
                        'text-center relative w-fit apr-text text-base sm:text-2xl font-medium leading-[125%] cursor-pointer'
                      }
                    >
                      {formatRewardBalance((totalReward * tokenPrice) / Math.pow(10, 18), 4)} USDT
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
          <Referral tokenPrice={tokenPrice} />
          <StakingPoolTabContent
            token={stakeToken1}
            dataSource={poolInfo1}
            selectedItem={selectedItems}
            selectedPool={selectedPool}
            handleSelectItems={handleSelectItems}
            selectedDurations={selectedDurations}
            setSelectedParentPool={setSelectedParentPool}
            setPoolIndex={setPoolIndex}
            setShowModalStaking={setShowModalStaking}
            handleSelectDuration={handleSelectDuration}
            setSelectedPool={setSelectedPool}
            infoPool={infoPool}
            infoPool2={infoPool2}
          />
        </div>

        <ModalStakingPools
          isModalOpen={!!showModalStaking}
          loading={loadingStaking}
          poolIndex={poolIndex}
          totalPool={poolIndex == 0 ? poolInfo1[0] : poolInfo1[1]}
          stakeInfo={stakeInfo as any}
          poolInfo={selectedParentPool?.est_apr}
          userPoolInfo={poolIndex == 0 ? infoPool2 : poolIndex == 1 ? infoPool : []}
          validate={validate}
          amountStake={amountStake}
          amountUnStake={amountUnStake}
          handleStake={handleStake}
          handleUnStake={handleUnStake}
          handleClose={toggleShowModalStaking}
          stakeToken={stakeToken1!}
          stakedAmount={stakedAmount}
          balance={balance}
          balanceStaked={currentStakedAmount}
          setBalanceStaked={setBalanceStaked}
          timeExpired={timeExpired}
          isExpired={isExpired}
          setIsExpired={setIsExpired}
          setTimeExpired={setTimeExpired}
          setValidate={setValidate}
          onChangeAmountStake={onChangeAmountStake}
          onChangeAmountUnStake={onChangeAmountUnStake}
          selectedItem={selectedItems}
          handleSelectItems={handleSelectItems}
          selectedPool={selectedPool}
          setSelectedPool={setSelectedPool}
          infoPool={infoPool}
          infoPool2={infoPool2}
        />
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
          setShow={setShowUnStake}
          confirmUnstake={handleUnStakeConfirm}
        />
      </section>
    </>
  );
};

export default Staking;
