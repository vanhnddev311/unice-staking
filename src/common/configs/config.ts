import { ENV, envNane } from '@/common/consts';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { bitgetWallet, injectedWallet, rainbowWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { createConfig, CreateConfigParameters, http } from 'wagmi';
import { bsc, bscTestnet, mainnet } from 'wagmi/chains';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [rainbowWallet, walletConnectWallet, bitgetWallet, injectedWallet],
    },
  ],
  {
    appName: 'UNICE Staking',
    projectId: 'c9ce17ad7531e60b4eed5232dc01958d',
  },
);

const testnetConf: CreateConfigParameters = {
  connectors,
  chains: [bscTestnet],
  transports: {
    [bscTestnet.id]: http(),
  },
};

const mainnetConf: CreateConfigParameters = {
  connectors,
  chains: [bsc],
  transports: {
    [bsc.id]: http(),
  },
};

export const config = createConfig(ENV == envNane.TESTNET ? testnetConf : mainnetConf);
