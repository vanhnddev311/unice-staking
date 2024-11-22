import { ENV, envNane } from '@/common/consts';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { CONFIGS, NetworkConfiguration } from '@manahippo/hippo-sdk';

export const networkConfig = () => {
  const currentNetworkEnv: envNane = (ENV as envNane) ?? envNane.MAINNET;
  let network: NetworkConfiguration;
  if (currentNetworkEnv === envNane.MAINNET) {
    network = CONFIGS.mainnet;
  } else if (currentNetworkEnv === envNane.STG) {
    network = CONFIGS.mainnet;
  } else {
    network = CONFIGS.testnet;
    //throw new Error('Invalid network env');
  }
  return network;
};
