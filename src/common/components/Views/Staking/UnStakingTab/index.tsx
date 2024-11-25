import InputCurrency from '@/common/components/common-components/InputCureency';
import { DEFAULT_DECIMALS, lockCooldownFormat, pool182Address, pool91Address } from '@/common/consts';
import { formatNumber } from '@/utils';
import { Button, Steps } from 'antd';
import BigNumber from 'bignumber.js';
import classNames from 'classnames';
import moment from 'moment/moment';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';

interface Props {
  loading: boolean;
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
  stakeToken: Token;
  stakedAmount: number;
  timeExpired: any;
  setIsExpired: (value: boolean) => void;
  setTimeExpired: (value: string) => void;
  setValidate: (value: string) => void;
  onChangeAmount: (value: string) => void;
  handleUnStake: (amount: number, pool: any) => void;
  setSelectedPool: (val: any) => void;
}

const UnStakingTab: React.FunctionComponent<Props> = ({
  stakeInfo,
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
}) => {
  useEffect(() => {
    setBalanceStaked(stakedAmount);
  }, [stakeInfo]);

  const unstakeTime = useMemo(() => {
    return moment.unix(BigNumber(userPoolInfo[3]).toNumber());
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
                    setPoolAddress(pool?.contract_address);
                    setSelectedPool(pool);
                    // setPoolSelected();
                  }}
                  className={classNames(
                    'relative bg-[#393C46] border border-[#393C46] rounded-[4px] text-base font-semibold py-[6px] px-[12px] cursor-pointer',
                    {
                      'border border-[#4A7DFF]': poolAddress === pool?.contract_address,
                    },
                  )}
                >
                  {pool?.est_apr[0]?.time}
                  <Image
                    src={require('@/common/assets/images/staking/selected-pool-icon.png')}
                    alt={''}
                    className={`${poolAddress == pool?.contract_address ? 'block' : 'hidden'} absolute w-[16px] h-[16px] top-[-1px] right-0 rounded-tr-[4px]`}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={'flex justify-between text-base'}>
          <div className={'text-[#8E929B] font-normal'}>APR</div>
          <div className={'apr-text font-bold'}>{formatNumber(Number(poolInfo?.est_apr[0]?.value))}%</div>
        </div>
      </div>
      <div>
        <InputCurrency
          label={'Unstake amount'}
          subTitle={'Staked'}
          enableUseMax={true}
          balance={Number(balance ?? 0) / Math.pow(10, 18)}
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
            You can’t unstake until <span className={'text-[#FF612F]'}>{unstakeTime.format(lockCooldownFormat)}</span>
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
        className="min-w-[156px] h-[52px] hover:bg-[#4A7DFF] disabled:bg-[#ccc] text-[#000] dark:text-[#fff] bg-[#4A7DFF] border-none rounded-[4px] font-medium
         w-full text-base"
      >
        UNSTAKE
      </Button>
    </div>
  );
};

export default UnStakingTab;
