import { createContext } from 'react';

const DEFAULT_CONTEXT = {
  feEnv: null,
} as AppContextState;

export const AppContext = createContext<AppContextState>(DEFAULT_CONTEXT as AppContextState);
