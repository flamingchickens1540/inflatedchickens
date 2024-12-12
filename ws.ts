import type { TeamMatch } from '$lib/types';
import { Server } from 'socket.io';
import { type ViteDevServer } from 'vite';
const info = (s: string) => console.log(`\x1b[32m ${s} \x1b[0m`);

const sid_to_username: Map<string, string> = new Map();
const robot_queue: [string, 'red' | 'blue'][] = [];
let curr_match_key: string = '';

const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server: ViteDevServer) {
		if (!server.httpServer) return;
		const io = new Server(server.httpServer);

		io.use((socket, next) => {
			const username = socket.handshake.auth.username;
			if (!username) {
				return next(new Error('invalid username'));
			}

			if (!sid_to_username) {
				console.log('SID TO USERNAME UNINIT');
			}
			// erroring in prod
			let old_entries = Object.entries(sid_to_username).find(
				([_key, value]) => value === username
			);
			if (old_entries) {
				old_entries
					.map(([key, _value]) => key)
					.forEach((key) => sid_to_username.delete(key));
			}

			sid_to_username.set(socket.id, username);

			next();
		});

		io.on('connect', (socket) => {
			if (socket.handshake.auth.token === 'celary') {
				info('Admin Aquired');
				socket.join('admin_room');
			}

			socket.emit('session', {
				session_id: socket.id
			});

			socket.on('join_queue', () => {
				const username = sid_to_username.get(socket.id);

				const team_data = robot_queue.pop();
				if (!team_data) {
					io.to('admin_room').emit('scout_joined_queue', username);
					socket.join('scout_queue');
					return;
				}
				io.to('admin_room').emit('robot_left_queue', team_data);
				socket.emit('time_to_scout', [curr_match_key, ...team_data]);
			});

			socket.on('leave_scout_queue', (scout_id: string) => {
				const scout_sid = sid_to_username
					.entries()
					.filter(([_sid, scout]) => scout === scout_id)
					.map(([sid, _]) => sid)
					.toArray()[0];
				console.log(scout_sid);
				// This event exist in the cast that the scout removed itself from the queue
				io.emit('scout_left_queue', scout_id);
				// This event exists in the case that the admin removed the scout from the queue
				// io.to(scout_sid).emit('you_left_queue');
				io.sockets.sockets.get(scout_sid)?.leave('scout_queue');
			});

			socket.on('leave_robot_queue', (robot: string) => {
				const index = robot_queue.findIndex(([id, _color]) => id === robot);
				if (index === -1) return;

				robot_queue.splice(index, 1);
			});

			socket.on(
				'send_match',
				async ([match_key, teams]: [string, [string, 'red' | 'blue'][]]) => {
					if (!socket.rooms.has('admin_room')) return;

					// TODO: New TeamMatch in DB request here

					info(`${match_key}: ${teams}`);

					const scout_queue = await io.in('scout_queue').fetchSockets();
					for (const socket of scout_queue) {
						const team_data = teams.pop();
						if (!team_data) break;

						const username = sid_to_username.get(socket.id);
						if (!username) {
							console.error('Scout in queue not in map');
							continue;
						}

						socket.leave('scout_queue');
						socket.emit('time_to_scout', [match_key, ...team_data]);
						io.to('admin_room').emit('scout_left_queue', username);
					}

					socket.emit(
						'robot_joined_queue',
						teams.map(([team, _color]) => team)
					);
					robot_queue.push(...teams);

					// Update all connected sockets with new match info (for cosmetic purposes)
					io.emit('new_match', match_key);
					curr_match_key = match_key;
				}
			);

			// Event-listener sockets that were offline to sync back up with the current match key
			socket.on('request_curr_match', () => {
				socket.emit('new_match', curr_match_key);
			});

			socket.on('remove_team_match', (team_match: TeamMatch) => {
				if (!socket.rooms.has('admin_room')) return;

				info(
					`New TeamMatch: ${team_match.match_key}_${team_match.team_key} was removed by the admin`
				);
				// TODO: Emit message from the db to remove team_match
			});

			socket.on('submit_team_match', (team_match: TeamMatch) => {
				io.to('admin_room').emit('new_team_match', team_match);
			});

			socket.on(
				'failed_submit_team_match',
				([team_match, response]: [TeamMatch, Response]) => {
					io.to('admin_room').emit('failed_team_match', [team_match, response]);
				}
			);
		});
	}
};

export default webSocketServer;
