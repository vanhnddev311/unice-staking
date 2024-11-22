import { getUserInfo } from '@/common/services/auth';
import { getFEEnvConfig } from '@/common/services/login';
import { useQuery } from '@tanstack/react-query';
import React, { ReactNode, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getData, removeData } from '../hooks/useLocalStoragre';
import { AppContext } from './contexts';

export interface WalletProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FunctionComponent<WalletProviderProps> = ({ children }) => {
  const app = useSelector((state: any) => state.app);

  // const { data: userQuota = 0 } = useQuery(['UserQuota', connected, app.is_login], async () => {
  //   return await getUserQuota();
  // });
  const { data: feEnv } = useQuery(['feEnv'], async () => {
    // const { data } = await getFEEnvConfig();
    return [];
  });

  return (
    <AppContext.Provider
      value={{
        // userQuota,
        feEnv,
        // accessToken: accessToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
