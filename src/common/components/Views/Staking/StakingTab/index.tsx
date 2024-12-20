import InputCurrency from '@/common/components/common-components/InputCureency';
import StakingPoolAPR from '@/common/components/Views/Staking/StakingPoolTab/StakingPoolAPR';
import { tokenAddress } from '@/common/consts';
import tokenABI from '@/common/contracts/abis/token.json';
import { formatNumber } from '@/utils';
import { Button, Popover } from 'antd';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import React, { useMemo } from 'react';
import { useAccount, useClient, useReadContract } from 'wagmi';

interface Props {
  loading: boolean;
  poolName: string;
  totalPool: any;
  stakeInfo: StakeInfo;
  amount: string;
  listPool: any[];
  selectedItem: any;
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
  handleSelectItems: (poolName: any, selectedId: any) => void;
}

const StakingTab: React.FunctionComponent<Props> = ({
  totalPool,
  poolName,
  amount,
  listPool,
  poolInfo,
  selectedItem,
  selectedPool,
  setPoolAddress,
  validate,
  setValidate,
  balance,
  stakeToken,
  onChangeAmount,
  handleStake,
  setSelectedPool,
  handleSelectItems,
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

  const currentPool = useMemo(() => {
    return selectedItem?.find((item: any) => item?.pool_name == totalPool?.pool_name)?.item;
  }, [selectedItem, totalPool]);

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
                    'w-[38px] sm:w-[41px] relative text-center bg-[#393C46] border border-[#393C46] rounded-[4px] text-base font-semibold py-[6px] sm:px-[12px] cursor-pointer',
                    {
                      'border border-[#4A7DFF]': currentPool?.contract_address === pool?.contract_address,
                    },
                  )}
                >
                  {pool?.time}
                  <Image
                    src={require('@/common/assets/images/staking/selected-pool-icon.png')}
                    alt={''}
                    className={`${currentPool?.contract_address == pool?.contract_address ? 'block' : 'hidden'} absolute w-[16px] h-[16px] top-[-1px] right-0 rounded-tr-[4px]`}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className={'flex justify-between text-base'}>
          <div className={'text-[#8E929B] font-medium'}>APR</div>
          <Popover
            content={<StakingPoolAPR uniceAPR={currentPool?.value[0] ?? 0} frensAPR={currentPool?.value[1] ?? 0} />}
            title={'Staking APR'}
          >
            <div className={'relative apr-text cursor-pointer'}>
              {Number(currentPool?.value[0] ?? 0) + Number(currentPool?.value[1] ?? 0)}%
              <Image
                src={require('@/common/assets/images/staking/Line 33.png')}
                alt={''}
                className={'absolute w-full'}
              />
            </div>
          </Popover>
        </div>
      </div>
      <div>
        <InputCurrency
          label={'Amount'}
          enableUseMax={true}
          balance={Number(balanceToken) / Math.pow(10, 18)}
          // balance={11}
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
        disabled={!amount || Number(amount) > Number(balanceToken) / Math.pow(10, 18)}
        onClick={() => handleStake(currentPool, totalPool?.id)}
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
