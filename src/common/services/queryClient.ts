import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 60 * 1000,
      refetchOnMount: 'always',
    },
    mutations: {
      onError: (error) => {
        // const message = getErrorMessage(error);
        // handleShowError(message);
      },
    },
  },
});

export default queryClient;
