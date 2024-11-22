import { config } from '@/common/configs/config';
import { tokenAddress } from '@/common/consts';
import useEnv from '@/common/hooks/useEnv';
import { getPoolInfo } from '@/common/services/staking';
import { useQuery } from '@tanstack/react-query';
import { Config, getBalance } from '@wagmi/core';
import { useRouter } from 'next/router';

let page = 1;

const listPools = [
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
  // const { indexerClient } = useClient();
  // const { connected, account } = useWallet();
  // const { view } = useContract();
  const router = useRouter();
  const { dataEnv } = useEnv();
  const { claimContractAddress, stakingContractAddress, collectionId } = dataEnv;

  if (router?.pathname != '/staking' && router?.pathname != '/redeem') {
    page = 1;
  }

  const { data: poolInfo, isFetching: isFetchingPoolInfo } = useQuery(['poolInfo'], async () => {
    return {
      name: 'Pool 1',
      items: listPools,
    };
  });

  const {
    data: stakeInfo = {
      stakePool91Info: null,
      stakePool182Info: null,
    },
  } = useQuery(
    ['stakeInfo', stakingContractAddress, poolInfo],
    async () => {
      return {
        stakePool91Info: '',
        stakePool182Info: '',
      };
    },
    {
      enabled: !!stakingContractAddress && !!poolInfo,
    },
  );

  const { data: balance = 0 } = useQuery(
    ['totalToken', tokenAddress],
    async () => {
      return getBalance(config as Config, {
        address: tokenAddress,
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

  // const {
  //   data: nftsData,
  //   refetch: refetchNfts,
  //   isFetching: isFetchingNfts,
  //   fetchNextPage: fetchNextPageNfts,
  // } = useInfiniteQuery(
  //   ['nfts', claimContractAddress],
  //   async ({ pageParam = 1 }) => {
  //     const limit = 100;
  //     const offset = (page - 1) * limit;
  //
  //     const res: any = await indexerClient.queryIndexer({
  //       query: graphqlNftsByCollectionsQuery(account?.address as string, JSON.stringify([collectionId]), offset, limit),
  //     });
  //
  //     page = pageParam + 1;
  //     const nftsData = res?.current_token_ownerships_v2 || [];
  //     const processNft = async (nft: any) => {
  //       const time = Math.floor(new Date().getTime() / 1000 / 86400 / 7).toString();
  //       const detail = await Promise.all([
  //         view({
  //           function: `${claimContractAddress}::voting_escrow::get_ve_token_lock_amount`,
  //           type_arguments: [],
  //           arguments: [nft.token_data_id],
  //         }),
  //         view({
  //           function: `${claimContractAddress}::voting_escrow::get_ve_token_lock_end_epoch`,
  //           type_arguments: [],
  //           arguments: [nft.token_data_id],
  //         }),
  //         view({
  //           function: `${claimContractAddress}::voting_escrow::get_voting_power_at_epoch`,
  //           type_arguments: [],
  //           arguments: [nft.token_data_id, time],
  //         }),
  //       ]).catch((e) => {
  //         console.log(e);
  //         return [[0], [0], [0]];
  //       });
  //       const [amount, endEpoch, votingPower] = detail;
  //       nft.amount = amount[0];
  //       nft.endEpoch = (endEpoch[0] as any) * 86400 * 7 * 1000;
  //       nft.votingPower = votingPower[0];
  //       nft.endEpochOrigin = endEpoch[0];
  //     };
  //
  //     // Process all nfts in parallel
  //     await Promise.all(nftsData.map(processNft));
  //     return nftsData;
  //   },
  //   {
  //     enabled: !!account?.address && !!claimContractAddress,
  //     cacheTime: 0,
  //     refetchOnWindowFocus: false,
  //     getNextPageParam: (lastPage, pages) => {
  //       if (lastPage?.length < 10) {
  //         return undefined;
  //       }
  //       return page;
  //     },
  //   },
  // );
  //
  // const getNFTInfo = async (nft: any) => {
  //   const time = Math.floor(new Date().getTime() / 1000 / 86400 / 7).toString();
  //
  //   try {
  //     const payloadViewLockedAmount = {
  //       function: `${claimContractAddress}::voting_escrow::get_ve_token_lock_amount`,
  //       type_arguments: [],
  //       arguments: [nft.token_data_id],
  //     };
  //
  //     const payloadViewVotingPower = {
  //       function: `${claimContractAddress}::voting_escrow::get_ve_token_lock_end_epoch`,
  //       type_arguments: [],
  //       arguments: [nft.token_data_id],
  //     };
  //
  //     const payloadViewExpire = {
  //       function: `${claimContractAddress}::voting_escrow::get_voting_power_at_epoch`,
  //       type_arguments: [],
  //       arguments: [nft.token_data_id, time],
  //     };
  //
  //     const data = await Promise.all([
  //       view(payloadViewLockedAmount),
  //       view(payloadViewVotingPower),
  //       view(payloadViewExpire),
  //     ]).catch((e) => {
  //       console.log(e);
  //       return [[0], [0], [0]];
  //     });
  //
  //     const [amount, endEpoch, votingPower] = data;
  //
  //     return {
  //       amount: amount[0],
  //       endEpoch: (endEpoch[0] as any) * 86400 * 7 * 1000,
  //       votingPower: votingPower[0],
  //       endEpochOrigin: endEpoch[0],
  //     };
  //   } catch (e) {
  //     console.log(e);
  //     return null;
  //   }
  // };
  //
  // const { data: nftsInfo } = useQuery(['testData', account, claimContractAddress], async () => {
  //   const data = await indexerClient.getTokenOwnedFromCollectionAddress(
  //     account?.address as any,
  //     collectionId as string,
  //   );
  //   const dataNFTs = [];
  //   const tasks: any[] = [];
  //   const tokens = data.current_token_ownerships_v2;
  //
  //   if (tokens.length === 0) {
  //     return [];
  //   }
  //   for (const token of tokens) {
  //     tasks.push(getNFTInfo(token));
  //   }
  //   const results = await Promise.all(tasks);
  //   for (const result of results) {
  //     if (result) {
  //       dataNFTs.push(result);
  //     }
  //   }
  //   return dataNFTs;
  // });

  return {
    stakeInfo,
    poolInfo,
    balance,
    isFetchingPoolInfo,
    // nfts: nftsData?.pages.flat() || [],
    // nftsPage: nftsData?.pageParams,
    // refetchNfts,
    // isFetchingNfts,
    // fetchNextPageNfts,
    // nftsInfo,
  };
};

export default useStaking;
