<script lang="ts">
	import { goto } from '$app/navigation';
	import { io } from 'socket.io-client';

	const socket = io();

	socket.on('connect', () => {
		console.log(socket.id);
		socket.emit('join_queue');
	});

	socket.on('time_to_scout', ([team_key, color]: [string, 'red' | 'blue']) => {
		goto(`/scout/${team_key}_${color}`);
	});
</script>

<h1>In Queue</h1>
