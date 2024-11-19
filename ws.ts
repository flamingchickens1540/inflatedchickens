import { Server } from 'socket.io';
import { type ViteDevServer } from 'vite';

const robotQueue: [string, 'red' | 'blue'][] = [];
let curr_match_key: string = '';

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

			socket.on('send_match', ([match_key, teams]: [string, [string, 'red' | 'blue'][]]) => {
				if (!socket.rooms.has('admin_room')) return;

				const scout_queue: Set<string> = io.of('/').adapter.rooms.get('scout_queue')!;
				scout_queue
					.values()
					.forEach((sid) => io.to(sid).emit('time_to_scout', teams.pop()));
				robotQueue.push(...teams);

				// TODO: Decide if we care about this
				// Update all connected sockets with new match info (for cosmetic purposes)
				io.emit('new_match', match_key);
				curr_match_key = match_key;
			});

			// Event-listener sockets that were offline to sync back up with the current match key
			socket.on('request_curr_match', () => {
				socket.emit('new_match', curr_match_key);
			});
		});
	}
};

export default webSocketServer;
