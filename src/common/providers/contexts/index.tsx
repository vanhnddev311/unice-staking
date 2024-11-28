import { createContext } from 'react';

const DEFAULT_CONTEXT = {
  userInfo: {},
} as AppContextState;

export const AppContext = createContext<AppContextState>(DEFAULT_CONTEXT as AppContextState);
