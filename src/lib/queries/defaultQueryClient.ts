import {QueryClient} from '@tanstack/react-query';

const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
        retry: 2,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        },
    },
});

export default defaultQueryClient;