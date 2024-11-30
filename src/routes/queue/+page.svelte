<script lang="ts">
	import { goto } from '$app/navigation';
	import { io, Socket } from 'socket.io-client';
	let socket: Socket;

	socket = io();

	socket.on('connect', () => {
		socket.emit('join_queue', 'test_scout');
	});

	socket.on('time_to_scout', ([match_key, team_key, color]: [string, string, 'red' | 'blue']) => {
		goto(`/scout/${match_key}-${team_key}-${color}`);
	});

	socket.on('you_left_queue', () => {
		goto('/');
	});

	const leave = () => {
		socket.emit('leave_scout_queue', 'test_scout');
		goto('/');
	};
</script>

<div
	class="grid h-full w-full grid-cols-1 grid-rows-2 place-items-center gap-4 align-middle text-4xl text-white"
>
	<h1 class="p-2 font-heading font-bold">In Queue</h1>

	<button class="rounded border p-4" onclick={leave}>Leave Queue</button>
</div>
