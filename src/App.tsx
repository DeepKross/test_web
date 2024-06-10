import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { AppConfig } from './config';
import { router } from './router';
import { queryClient } from './services/react-query';
import { store } from './services/store';

export function App() {
	return (
		<ReduxProvider store={store}>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
				{AppConfig.MODE === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
			</QueryClientProvider>
		</ReduxProvider>
	);
}
