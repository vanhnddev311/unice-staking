import InputCurrency from '@/common/components/common-components/InputCureency';
import { ENV, envNane, lockCooldownFormat } from '@/common/consts';
import { formatNumber } from '@/utils';
import { Button } from 'antd';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import moment from 'moment/moment';
import Image from 'next/image';
import React, { useEffect, useMemo } from 'react';

interface Props {
  loading: boolean;
  poolIndex: any;
  poolName: string;
  totalPool: any;
  stakeInfo: StakeInfo;
  listPool: any[];
  poolInfo: PollInfo;
  userPoolInfo: any;
  poolAddress: string;
  setPoolAddress: (address: string) => void;
  amount: string;
  subTitle?: string;
  validate: string;
  balance: number | string;
  setBalanceStaked: (value: any) => void;
  selectedItem: any;
  stakeToken: Token;
  stakedAmount: number;
  timeExpired: any;
  setIsExpired: (value: boolean) => void;
  setTimeExpired: (value: string) => void;
  setValidate: (value: string) => void;
  onChangeAmount: (value: string) => void;
  handleUnStake: (amount: number, pool: any) => void;
  setSelectedPool: (val: any) => void;
  handleSelectItems: (poolName: any, selectedId: any) => void;
  infoPool: any;
  infoPool2: any;
}

const UnStakingTab: React.FunctionComponent<Props> = ({
  stakeInfo,
  totalPool,
  poolIndex,
  listPool,
  poolInfo,
  userPoolInfo,
  poolAddress,
  setPoolAddress,
  amount,
  balance,
  setBalanceStaked,
  stakeToken,
  stakedAmount,
  validate,
  setIsExpired,
  setTimeExpired,
  setValidate,
  onChangeAmount,
  handleUnStake,
  setSelectedPool,
  selectedItem,
  handleSelectItems,
  poolName,
  infoPool2,
  infoPool,
}) => {
  useEffect(() => {
    setBalanceStaked(stakedAmount);
  }, [stakeInfo]);

  const unstakeTime = useMemo(() => {
    return moment.unix(BigNumber(userPoolInfo?.[3]).toNumber());
  }, [userPoolInfo]);

  const lockTimeFormat = useMemo(() => {
    return unstakeTime.format(lockCooldownFormat);
  }, [stakeInfo?.start_time]);

  const isExpired = unstakeTime.diff(Date.now()) / (1000 * 60 * 60 * 24) < 0;

  const calculateTimeLeft = () => {
    const now = moment.utc().valueOf();
    const count_down_end_at = new Date(unstakeTime.valueOf()).getTime();
    const distance = count_down_end_at - now;

    return distance < 0;
  };

  useEffect(() => {
    if (!isExpired) {
      const timer = setInterval(() => {
        setIsExpired(calculateTimeLeft());
      }, 2000);
      return () => {
        clearInterval(timer);
      };
    } else {
      setIsExpired(calculateTimeLeft());
    }
  }, [calculateTimeLeft()]);

  useEffect(() => {
    setIsExpired(isExpired);
    setTimeExpired(lockTimeFormat);
  }, [lockTimeFormat]);

  const currentPool = useMemo(() => {
    return selectedItem?.find((item: any) => item?.pool_name == totalPool?.pool_name)?.item;
  }, [selectedItem, totalPool]);

  const selectedItem1 = useMemo(() => {
    return poolIndex == 0 ? selectedItem[0]?.item : selectedItem[1]?.item;
  }, [poolIndex, selectedItem]);

  const balanceStaked = useMemo(() => {
    if (!infoPool || infoPool.some((pool: any) => !pool || !pool.result)) {
      return '0 UNICE';
    }

    const poolsIndex =
      ENV === envNane.TESTNET
        ? selectedItem1?.id == '6'
          ? 0
          : selectedItem1?.id == '7'
            ? 1
            : 2
        : selectedItem1?.id == '2'
          ? 0
          : selectedItem1?.id == '3'
            ? 1
            : 2;

    const poolsIndex2 =
      ENV === envNane.TESTNET
        ? selectedItem1?.id == '3'
          ? 0
          : selectedItem1?.id == '4'
            ? 1
            : 2
        : selectedItem1?.id == '2'
          ? 0
          : selectedItem1?.id == '3'
            ? 1
            : 2;

    const poolResult =
      poolIndex == 0
        ? ((infoPool2?.[poolsIndex2]?.result as number[]) ?? 0)
        : ((infoPool?.[poolsIndex]?.result as number[]) ?? 0);

    const formattedValue = formatNumber(Number(poolResult?.[0]) / Math.pow(10, 18) ?? 0);

    return Number(formattedValue);
  }, [infoPool, infoPool2, poolIndex, selectedItem1]);

  return (
    <div className={'flex flex-col gap-6'}>
      <div className={'flex flex-col text-base text-[#8E929B] gap-4'}>
        <div className={'flex justify-between items-center'}>
          <div>Duration (months)</div>
          <div className={'flex text-[#fff] gap-2'}>
            {listPool?.map((pool: any) => {
              return (
                <div
                  key={pool?.id}
                  onClick={() => {
                    handleSelectItems(poolName, pool?.id);
                    setPoolAddress(pool?.contract_address);
                    setSelectedPool(pool);
                    // setPoolSelected();
                  }}
                  className={classNames(
                    'w-[41px] text-center relative bg-[#393C46] border border-[#393C46] rounded-[4px] text-base font-semibold py-[6px] px-[12px] cursor-pointer',
                    {
                      'border border-[#4A7DFF]': currentPool?.contract_address === pool?.contract_address,
                    },
                  )}
                >
                  {pool?.time}
                  <Image
                    src={require('@/common/assets/images/staking/selected-pool-icon.png')}
                    alt={''}
                    className={`${currentPool?.contract_address === pool?.contract_address ? 'block' : 'hidden'} absolute w-[16px] h-[16px] top-[-1px] right-0 rounded-tr-[4px]`}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={'flex justify-between text-base'}>
          <div className={'text-[#8E929B] font-normal'}>APR</div>
          <div className={'apr-text font-bold'}>{formatNumber(Number(currentPool?.value))}%</div>
        </div>
      </div>
      <div>
        <InputCurrency
          label={'Unstake amount'}
          subTitle={'Staked'}
          enableUseMax={true}
          balance={Number(balanceStaked ?? 0)}
          token={stakeToken}
          amount={amount}
          isAllowDecimal={true}
          maxDecimals={stakeToken?.decimals}
          handleChange={(value) => {
            setValidate('');
            onChangeAmount(value);
          }}
          loading={true}
        />
        <p className={'text-red-500 my-2'}>{validate}</p>
        {!isExpired ? (
          <div className={'text-base text-[#FF612F]'}>
            You can’t unstake now
            {/*until <span className={'text-[#FF612F]'}>{unstakeTime.format(lockCooldownFormat)}</span>*/}
          </div>
        ) : (
          <div className={'text-base text-[#4A7DFF] opacity-0'}>Get $UNICE</div>
        )}
      </div>
      <Button
        // disabled={Number(stakeInfo?.stake_amount) === 0}
        // loading={loading}
        disabled={!isExpired || !amount}
        onClick={() => handleUnStake(Number(amount), poolInfo)}
        size="small"
        className="min-w-[156px] h-[52px] hover:bg-[#4A7DFF] disabled:bg-[#242632] disabled:text-[#44465E] text-[#000] dark:text-[#fff] bg-[#4A7DFF] border-none rounded-[4px] font-medium
         w-full text-base"
      >
        UNSTAKE
      </Button>
    </div>
  );
};

export default UnStakingTab;
