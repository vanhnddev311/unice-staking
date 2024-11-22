import { LockIcon } from '@/common/components/icon/common';
import { Button, Tooltip } from 'antd';
import classNames from 'classnames';
import moment from 'moment/moment';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';

interface Props {
  loading: boolean;
  stakeInfo: StakeInfo;
  poolInfo: PollInfo;
  amountStake: string;
  amountUnStake: string;
  validate: string;
  balance: number | string | any;
  balanceStaked: number | string | any;
  stakeToken: Token;
  isExpired: boolean;
  setIsExpired: (value: boolean) => void;
  setTimeExpired: (value: string) => void;
  setValidate: (value: string) => void;
  onChangeAmountStake: (value: string) => void;
  onChangeAmountUnStake: (value: string) => void;
  handleStake: () => void;
  handleUnStake: () => void;
}

const CardStaking: React.FunctionComponent<Props> = ({
  loading,
  stakeInfo,
  poolInfo,
  amountStake,
  amountUnStake,
  validate,
  balance,
  balanceStaked,
  stakeToken,
  setIsExpired,
  setTimeExpired,
  setValidate,
  onChangeAmountStake,
  onChangeAmountUnStake,
  handleStake,
  handleUnStake,
}) => {
  const [isStake, setIsStake] = useState<boolean>(true);
  const [isUnStake, setIsUnStake] = useState<boolean>(false);

  const lockTime = useMemo(() => {
    return moment.unix(Number(stakeInfo?.start_time)).add(Number(poolInfo?.lock_duration) * 1000, 'ms');
  }, [stakeInfo?.start_time]);

  const isExpired = lockTime.diff(Date.now()) / (1000 * 60 * 60 * 24) < 0;

  // useEffect(() => {
  //   if (!connected) {
  //     setIsStake(true);
  //     setIsUnStake(false);
  //   }
  // }, [connected]);

  return (
    <div className={'relative w-full p-2'}>
      <div className={'absolute left-0 top-0'}>
        <Image className={''} src={require('@/common/assets/images/cornerTopLeft.png')} alt="" />
      </div>
      <div className={'absolute top-0 right-0'}>
        <Image className={''} src={require('@/common/assets/images/cornerTopRight.png')} alt="" />
      </div>
      <div className={'absolute bottom-0 left-0'}>
        <Image className={''} src={require('@/common/assets/images/cornerBottomLeft.png')} alt="" />
      </div>
      <div className={'absolute bottom-0 right-0'}>
        <Image className={''} src={require('@/common/assets/images/cornerBottomRight.png')} alt="" />
      </div>
      <div className={'flex flex-col bg-[#1C1D25] p-5 border border-[#33343E] relative rounded-[6px] gap-6'}>
        <div className={'flex flex-col gap-4'}>
          <div className={'flex'}>
            <Button
              className={classNames(
                `h-[40px]  border-none font-semibold w-1/2 px-5 py-2`,
                {
                  'bg-[#C2E23D] text-[#000] ': isStake,
                },
                { 'bg-[#FFFFFF33] text-[#fff]': !isStake },
              )}
              size="small"
              onClick={() => {
                if (!isStake) {
                  setIsStake(true);
                  setIsUnStake(false);
                }
              }}
            >
              STAKE
            </Button>
            {isExpired ? (
              <Button
                // disabled={!connected}
                className={classNames(
                  `flex justify-center items-center h-[40px] border-none font-semibold w-1/2 px-5 py-2 gap-2`,
                  {
                    'bg-[#C2E23D] text-[#000] ': isUnStake,
                  },
                  { 'bg-[#FFFFFF33] text-[#fff]': !isUnStake },
                )}
                icon={<LockIcon fill={isUnStake ? 'black' : 'white'} style={'hidden'} />}
                size="small"
                onClick={() => {
                  if (!isUnStake) {
                    setIsStake(false);
                    setIsUnStake(true);
                  }
                }}
              >
                UNSTAKE
              </Button>
            ) : (
              <Tooltip color={'#444D64'} title={'You can unstake after the lock date has expired'}>
                <div className={'w-1/2'}>
                  <Button
                    // disabled={!connected}
                    className={classNames(
                      `flex justify-center items-center h-[40px] border-none font-semibold w-full px-5 py-2 gap-2`,
                      {
                        'bg-[#C2E23D] text-[#000] ': isUnStake,
                      },
                      { 'bg-[#FFFFFF33] text-[#fff]': !isUnStake },
                      // { 'pointer-events-none': !connected },
                    )}
                    icon={<LockIcon fill={isUnStake ? 'black' : 'white'} style={''} />}
                    size="small"
                    onClick={() => {
                      if (!isUnStake) {
                        setIsStake(false);
                        setIsUnStake(true);
                      }
                    }}
                  >
                    UNSTAKE
                  </Button>
                </div>
              </Tooltip>
            )}
          </div>
          {/* {isStake && (
            <StakingTab
              loading={loading}
              stakeInfo={stakeInfo}
              amount={amountStake}
              poolInfo={poolInfo}
              validate={validate}
              setValidate={setValidate}
              balance={balance}
              stakeToken={stakeToken}
              onChangeAmount={onChangeAmountStake}
              handleStake={handleStake}
            />
          )}
          {isUnStake && (
            <UnStakingTab
              loading={loading}
              stakeInfo={stakeInfo}
              poolInfo={poolInfo}
              amount={amountUnStake}
              validate={validate}
              subTitle={'Staked amount'}
              balance={balanceStaked}
              stakeToken={stakeToken}
              setIsExpired={setIsExpired}
              setTimeExpired={setTimeExpired}
              setValidate={setValidate}
              onChangeAmount={onChangeAmountUnStake}
              handleUnStake={handleUnStake}
            />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default CardStaking;
