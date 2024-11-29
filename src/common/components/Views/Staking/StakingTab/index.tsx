import InputCurrency from '@/common/components/common-components/InputCureency';
import {
  contractAddress,
  DEFAULT_DECIMALS,
  lockCooldownFormat,
  MAX_INT,
  pool182Address,
  pool91Address,
  tokenAddress,
} from '@/common/consts';
import tokenABI from '@/common/contracts/abis/token.json';
import { formatNumber } from '@/utils';
import { Button, Steps } from 'antd';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { useAccount, useClient, useReadContract, useWriteContract } from 'wagmi';

interface Props {
  loading: boolean;
  totalPool: any;
  stakeInfo: StakeInfo;
  amount: string;
  listPool: any[];
  selectedPool: any;
  poolInfo: any;
  poolAddress: string;
  setPoolAddress: (address: string) => void;
  validate: string;
  setValidate: (value: string) => void;
  balance: number | string;
  stakeToken: Token;
  onChangeAmount: (value: string) => void;
  handleStake: (pool: any, poolId: string) => void;
  setSelectedPool: (val: any) => void;
}

const StakingTab: React.FunctionComponent<Props> = ({
  totalPool,
  amount,
  listPool,
  poolInfo,
  selectedPool,
  poolAddress,
  setPoolAddress,
  validate,
  setValidate,
  balance,
  stakeToken,
  onChangeAmount,
  handleStake,
  setSelectedPool,
}) => {
  const { address } = useAccount();
  const client = useClient();

  const { data: balanceToken = 0 } = useReadContract({
    abi: tokenABI,
    address: tokenAddress,
    functionName: 'balanceOf',
    args: [address],
    chainId: client?.chain?.id ?? 1,
  });
  console.log('totalPool', totalPool);

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
                    'w-[41px] relative text-center bg-[#393C46] border border-[#393C46] rounded-[4px] text-base font-semibold py-[6px] px-[12px] cursor-pointer',
                    {
                      'border border-[#4A7DFF]': selectedPool?.contract_address === pool?.contract_address,
                    },
                  )}
                >
                  {pool?.time}
                  <Image
                    src={require('@/common/assets/images/staking/selected-pool-icon.png')}
                    alt={''}
                    className={`${selectedPool?.contract_address == pool?.contract_address ? 'block' : 'hidden'} absolute w-[16px] h-[16px] top-[-1px] right-0 rounded-tr-[4px]`}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={'flex justify-between text-base'}>
          <div className={'text-[#8E929B] font-normal'}>APR</div>
          <div className={'apr-text font-bold'}>{formatNumber(Number(selectedPool?.value))}%</div>
        </div>
      </div>
      <div>
        <InputCurrency
          label={'Amount'}
          enableUseMax={true}
          balance={Number(balanceToken) / Math.pow(10, 18)}
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
        <Link href={'https://www.bitget.com/spot/UNICEUSDT'} target={'_blank'}>
          <div className={'text-base text-[#4A7DFF]'}>Get $UNICE</div>
        </Link>
      </div>
      <Button
        disabled={!amount}
        onClick={() => handleStake(poolInfo, totalPool?.id)}
        size="small"
        className="min-w-[156px] h-[52px] hover:bg-[#4A7DFF] disabled:bg-[#242632] disabled:text-[#44465E] text-[#000] dark:text-[#fff] bg-[#4A7DFF] border-none rounded-[4px] font-medium
         w-full text-base"
      >
        STAKE NOW
      </Button>
    </div>
  );
};

export default StakingTab;
