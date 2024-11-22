import { AppContext } from '@/common/providers/contexts';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

const useEnv = () => {
  const { feEnv } = useContext(AppContext);
  const {
    data: dataEnv = {
      contractAddress: '',
      claimContractAddress: '',
      stakingContractAddress: '',
      collectionId: '',
    },
  } = useQuery(
    ['config', feEnv],
    async () => {
      if (feEnv) {
        const contractAddress = feEnv.BUY_CONTRACT_ADDRESS;
        const claimContractAddress = feEnv.CLAIM_CONTRACT_ADDRESS;
        const stakingContractAddress = feEnv.STAKING_CONTRACT_ADDRESS;
        const collectionId = feEnv.COLLECTION_ID;

        return {
          contractAddress: contractAddress,
          claimContractAddress: claimContractAddress,
          stakingContractAddress: stakingContractAddress,
          collectionId: collectionId,
        };
      }
    },
    {
      enabled: !!feEnv,
    },
  );

  return {
    dataEnv,
  };
};

export default useEnv;
