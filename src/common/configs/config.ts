import { connectorsForWallets, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { bitgetWallet, injectedWallet, rainbowWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { createConfig, http } from 'wagmi';
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

export const config = createConfig({
  connectors,
  chains: [bsc, bscTestnet],
  transports: {
    [bscTestnet.id]: http(),
    // [mainnet.id]: http(),
    [bsc.id]: http(),
  },
});
