export const AppConfig = {
  MODE: import.meta.env.MODE as 'development' | 'production' | 'test',
  ENV: import.meta.env.ENV as 'local' | 'development' | 'production',
  API_URL: import.meta.env.VITE_API_URL,
};
