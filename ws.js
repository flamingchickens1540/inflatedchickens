import { Server } from 'socket.io';

const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server) {
		const io = new Server(server.httpServer);

		io.on('connect', (socket) => {
			socket.emit('messageFromServer', 'Houston');
		});
	}
};

export default webSocketServer;
