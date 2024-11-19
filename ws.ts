import { Server } from 'socket.io';
import { type ViteDevServer } from 'vite';

const robotQueue: [string, 'red' | 'blue'][] = [];

const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server: ViteDevServer) {
		if (!server.httpServer) return;
		const io = new Server(server.httpServer);

		io.on('connect', (socket) => {
			if (socket.handshake.headers.authorization === 'super-secret')
				socket.join('admin_room');
			socket.emit('messageFromServer', 'Houston');

			socket.on('join_queue', (_) => {
				const team_data = robotQueue.pop();
				if (!team_data) {
					socket.join('scout_queue');
					return;
				}
				socket.emit('time_to_scout', team_data);
			});

			socket.on('leave_queue', (_) => {
				socket.leave('scout_queue');
			});

			socket.on('send_match', (teams: [string, 'red' | 'blue'][]) => {
				if (!socket.rooms.has('admin_room')) return;

				const scout_queue: Set<string> = io.of('/').adapter.rooms.get('scout_queue')!;
				scout_queue
					.values()
					.forEach((sid) => io.to(sid).emit('time_to_scout', teams.pop()));
				robotQueue.push(...teams);
			});
		});
	}
};

export default webSocketServer;
