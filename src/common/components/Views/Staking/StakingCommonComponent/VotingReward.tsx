import { DEFAULT_DECIMALS } from '@/common/consts';
import { formatNumber } from '@/utils';
import BigNumber from 'bignumber.js';
import moment from 'moment/moment';
import React, { useMemo } from 'react';

const VotingRewardRerender: React.FunctionComponent<{ record: any }> = ({ record }) => {
  const unstakeTime = useMemo(() => {
    return moment(record?.close_at).add(Number(record?.est_apr[0].time), 'days').endOf('days').valueOf();
  }, [record?.stakedInfo?.start_time]);

  const remainingTime = useMemo(() => {
    return (unstakeTime - moment().endOf('days').valueOf()) / (1000 * 60 * 60 * 24);
  }, [unstakeTime]);

  const votingPower = useMemo(() => {
    return BigNumber(record?.stakedInfo?.stake_amount)
      .minus(BigNumber(record?.stakedInfo?.claimed_amount))
      .times(BigNumber(remainingTime))
      .div(BigNumber(365 * 2))
      .div(BigNumber(10).pow(DEFAULT_DECIMALS))
      .toNumber();
  }, [remainingTime]);

  return (
    <div className={'text-base text-[#fff] font-semibold'}>
      {votingPower && votingPower !== 0 ? formatNumber(votingPower) : 0} veMGPT
    </div>
  );
};

export default VotingRewardRerender;
