import { type ViteDevServer } from 'vite';
import injectServer from './ws';

export const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server: ViteDevServer) {
		if (!server.httpServer) return;
		injectServer(server.httpServer);
	}
};
