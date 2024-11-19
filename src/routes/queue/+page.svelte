<script lang="ts">
	import { goto } from '$app/navigation';
	import { io } from 'socket.io-client';

	const socket = io();

	socket.on('connect', () => {
		console.log(socket.id);
		socket.emit('join_queue');
	});

	socket.on('time_to_scout', ([match_key, team_key, color]: [string, string, 'red' | 'blue']) => {
		goto(`/scout/${match_key}-${team_key}-${color}`);
	});

	const leave = () => {
		socket.emit('leave_queue');
		goto('/');
	};
</script>

<h1>In Queue</h1>

<button onclick={leave}>Leave Queue</button>
