import { DefaultOptions, QueryClient } from '@tanstack/react-query';

const defaultOptions: DefaultOptions = {
	queries: {
		refetchOnWindowFocus: false,
		retry: false,
	},
};

export const queryClient = new QueryClient({
	defaultOptions,
});
