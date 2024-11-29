import { createContext } from 'react';

const DEFAULT_CONTEXT = {
  userInfo: {},
  refetchUserInfo: () => {},
} as AppContextState;

export const AppContext = createContext<AppContextState>(DEFAULT_CONTEXT as AppContextState);
