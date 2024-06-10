/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly DRONE_MODE: string;
	readonly DRONE_ENV: string;
	readonly DRONE_API_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
