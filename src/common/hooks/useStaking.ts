import { config } from '@/common/configs/config';
import { ENV, tokenAddress } from '@/common/consts';
import { useQuery } from '@tanstack/react-query';
import { Config, getBalance } from '@wagmi/core';
import { useRouter } from 'next/router';
import { useAccount } from 'wagmi';

let page = 1;

const listPools = [
  {
    id: '6',
    pool_name: 'Pool 1',
    type: 2,
    start_at: '2024-04-14T14:00:00.000Z',
    close_at: '2024-06-25T14:00:00.000Z',
    est_apr: [
      {
        time: 3,
        value: 15,
      },
    ],
    token_address: '0x67cd1ad961c064f6048950909172eade0db484f5b7312c923e12a08911cf91df',
    status: 2,
    contract_address: '0x192e0ad5c282defef9edffdc0578645400c024fdfe2f97e42d760afc9847642f',
    pool_index: -1,
    weight: 1,
    details_url: null,
    counting_enable: false,
    deletedAt: null,
    stakedInfo: '',
  },
  {
    id: '7',
    pool_name: 'Pool 2',
    type: 2,
    start_at: '2024-04-14T14:00:00.000Z',
    close_at: '2024-06-25T14:00:00.000Z',
    est_apr: [
      {
        time: 6,
        value: 30,
      },
    ],
    token_address: '0x67cd1ad961c064f6048950909172eade0db484f5b7312c923e12a08911cf91df',
    status: 2,
    contract_address: '0x6c06d1ce79b522a3ffb7436b11d5d4a7f17996f7f6d08bef89293f7434252744',
    pool_index: -1,
    weight: 1,
    details_url: null,
    counting_enable: false,
    deletedAt: null,
    stakedInfo: '',
  },
  {
    id: '8',
    pool_name: 'Pool 3',
    type: 2,
    start_at: '2024-04-14T14:00:00.000Z',
    close_at: '2024-06-25T14:00:00.000Z',
    est_apr: [
      {
        time: 12,
        value: 60,
      },
    ],
    token_address: '0x67cd1ad961c064f6048950909172eade0db484f5b7312c923e12a08911cf91df',
    status: 2,
    contract_address: '0x6c06d1ce79b522a3ffb7436b11d5d4a7f17996f7f6d08bef89293f7434252745',
    pool_index: -1,
    weight: 1,
    details_url: null,
    counting_enable: false,
    deletedAt: null,
    stakedInfo: '',
  },
];
const listPoolsFrens = [
  {
    id: '3',
    pool_name: 'Pool 1',
    type: 2,
    start_at: '2024-04-14T14:00:00.000Z',
    close_at: '2024-06-25T14:00:00.000Z',
    est_apr: [
      {
        time: 3,
        value: 15,
      },
    ],
    token_address: '0x67cd1ad961c064f6048950909172eade0db484f5b7312c923e12a08911cf91df',
    status: 2,
    contract_address: '0x192e0ad5c282defef9edffdc0578645400c024fdfe2f97e42d760afc9847642f',
    pool_index: -1,
    weight: 1,
    details_url: null,
    counting_enable: false,
    deletedAt: null,
    stakedInfo: '',
  },
  {
    id: '4',
    pool_name: 'Pool 2',
    type: 2,
    start_at: '2024-04-14T14:00:00.000Z',
    close_at: '2024-06-25T14:00:00.000Z',
    est_apr: [
      {
        time: 6,
        value: 30,
      },
    ],
    token_address: '0x67cd1ad961c064f6048950909172eade0db484f5b7312c923e12a08911cf91df',
    status: 2,
    contract_address: '0x6c06d1ce79b522a3ffb7436b11d5d4a7f17996f7f6d08bef89293f7434252744',
    pool_index: -1,
    weight: 1,
    details_url: null,
    counting_enable: false,
    deletedAt: null,
    stakedInfo: '',
  },
  {
    id: '5',
    pool_name: 'Pool 3',
    type: 2,
    start_at: '2024-04-14T14:00:00.000Z',
    close_at: '2024-06-25T14:00:00.000Z',
    est_apr: [
      {
        time: 12,
        value: 60,
      },
    ],
    token_address: '0x67cd1ad961c064f6048950909172eade0db484f5b7312c923e12a08911cf91df',
    status: 2,
    contract_address: '0x6c06d1ce79b522a3ffb7436b11d5d4a7f17996f7f6d08bef89293f7434252745',
    pool_index: -1,
    weight: 1,
    details_url: null,
    counting_enable: false,
    deletedAt: null,
    stakedInfo: '',
  },
];

const listPoolsMain = [
  {
    id: '2',
    pool_name: 'Pool 1',
    type: 2,
    start_at: '2024-04-14T14:00:00.000Z',
    close_at: '2024-06-25T14:00:00.000Z',
    est_apr: [
      {
        time: 3,
        value: 15,
      },
    ],
    token_address: '0x67cd1ad961c064f6048950909172eade0db484f5b7312c923e12a08911cf91df',
    status: 2,
    contract_address: '0x192e0ad5c282defef9edffdc0578645400c024fdfe2f97e42d760afc9847642f',
    pool_index: -1,
    weight: 1,
    details_url: null,
    counting_enable: false,
    deletedAt: null,
    stakedInfo: '',
  },
  {
    id: '3',
    pool_name: 'Pool 2',
    type: 2,
    start_at: '2024-04-14T14:00:00.000Z',
    close_at: '2024-06-25T14:00:00.000Z',
    est_apr: [
      {
        time: 6,
        value: 30,
      },
    ],
    token_address: '0x67cd1ad961c064f6048950909172eade0db484f5b7312c923e12a08911cf91df',
    status: 2,
    contract_address: '0x6c06d1ce79b522a3ffb7436b11d5d4a7f17996f7f6d08bef89293f7434252744',
    pool_index: -1,
    weight: 1,
    details_url: null,
    counting_enable: false,
    deletedAt: null,
    stakedInfo: '',
  },
  {
    id: '4',
    pool_name: 'Pool 3',
    type: 2,
    start_at: '2024-04-14T14:00:00.000Z',
    close_at: '2024-06-25T14:00:00.000Z',
    est_apr: [
      {
        time: 12,
        value: 60,
      },
    ],
    token_address: '0x67cd1ad961c064f6048950909172eade0db484f5b7312c923e12a08911cf91df',
    status: 2,
    contract_address: '0x6c06d1ce79b522a3ffb7436b11d5d4a7f17996f7f6d08bef89293f7434252745',
    pool_index: -1,
    weight: 1,
    details_url: null,
    counting_enable: false,
    deletedAt: null,
    stakedInfo: '',
  },
];

const useStaking = () => {
  const router = useRouter();
  const { address } = useAccount();

  if (router?.pathname != '/staking' && router?.pathname != '/redeem') {
    page = 1;
  }

  const { data: poolInfo = [], isFetching: isFetchingPoolInfo } = useQuery(['poolInfo'], async () => {
    return [
      {
        name: 'Pool 1',
        items: ENV == 'testnet' ? listPools : listPoolsMain,
      },
      {
        name: 'Pool 2',
        items: ENV == 'testnet' ? listPoolsFrens : listPoolsMain,
      },
    ];
  });

  const {
    data: stakeInfo = {
      stakePool91Info: null,
      stakePool182Info: null,
    },
  } = useQuery(
    ['stakeInfo', poolInfo],
    async () => {
      return {
        stakePool91Info: '',
        stakePool182Info: '',
      };
    },
    {
      enabled: !!poolInfo,
    },
  );

  const { data: balance } = useQuery(
    ['totalToken', tokenAddress],
    async () => {
      return getBalance(config as Config, {
        address: address || '0x',
        token: tokenAddress,
      });
    },
    {
      enabled: !!tokenAddress,
      refetchOnWindowFocus: 'always',
      refetchOnMount: 'always',
      refetchOnReconnect: 'always',
      refetchIntervalInBackground: true,
    },
  );

  return {
    stakeInfo,
    poolInfo,
    balance,
    isFetchingPoolInfo,
  };
};

export default useStaking;
