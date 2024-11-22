import { AppProvider } from '@/common/providers/AppProvider';
import '@/styles/antd.css';
import '@/styles/globals.css';
import '@/styles/notification.css';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import PageLayout from '@/common/layout/LayoutPage';
import queryClient from '@/common/services/queryClient';
import store from '@/common/stores/store';

import { config } from '@/common/configs/config';
import { connectorsForWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { bitgetWallet, metaMaskWallet, walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { bsc, bscTestnet, mainnet } from 'wagmi/chains';

// const connectors = connectorsForWallets(
//   [
//     {
//       groupName: 'Recommended',
//       wallets: [metaMaskWallet, bitgetWallet, walletConnectWallet],
//     },
//   ],
//   {
//     appName: 'My RainbowKit App',
//     projectId: 'c9ce17ad7531e60b4eed5232dc01958d',
//   },
// );
//
// const config = createConfig({
//   connectors,
//   // multiInjectedProviderDiscovery: false,
//   chains: [mainnet, bsc, bscTestnet],
//   transports: {
//     [bscTestnet.id]: http(),
//     [mainnet.id]: http(),
//     [bsc.id]: http(),
//   },
// });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale={'en'}>
          <ReduxProvider store={store}>
            <AppProvider>
              <PageLayout>
                <Component {...pageProps} />
              </PageLayout>
            </AppProvider>
          </ReduxProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
