import { AppProvider } from '@/common/providers/AppProvider';
import '@/styles/antd.css';
import '@/styles/globals.css';
import '@/styles/notification.css';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import PageLayout from '@/common/layout/LayoutPage';
import queryClient from '@/common/services/queryClient';
import store from '@/common/stores/store';

import { config } from '@/common/configs/config';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';

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
