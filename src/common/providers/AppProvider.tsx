import { getUserInfo } from '@/common/services/login';
import { useQuery } from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import { useAccount } from 'wagmi';
import { AppContext } from './contexts';

export interface WalletProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FunctionComponent<WalletProviderProps> = ({ children }) => {
  const { address } = useAccount();

  const { data: userInfo } = useQuery(['userQuota'], async () => {
    const { data } = await getUserInfo(address as string);
    return data.Data;
  });

  return (
    <AppContext.Provider
      value={{
        userInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
