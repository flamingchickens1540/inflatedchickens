<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { io, Socket } from 'socket.io-client';
	const username = 'test_scout';
	let socket: Socket;

	socket = io({
		auth: {
			username
		}
	});

	socket.on('connect', () => {
		socket.emit('join_queue');
	});

	socket.on('time_to_scout', ([match_key, team_key, color]: [string, string, 'red' | 'blue']) => {
		goto(`/scout/${match_key}-${team_key}-${color}`);
	});

	socket.on('scout_left_queue', (scout: string) => {
		if (scout === username) {
			goto('/');
		}
	});

	const leave = () => {
		socket.emit('leave_scout_queue', 'test_scout');
		goto('/');
	};
</script>

<div class="grid h-full w-full grid-cols-1 grid-rows-2 place-items-center gap-4 align-middle">
	<h1 class="p-2 font-heading text-5xl font-bold text-yellow-400">In Queue</h1>

	<button class="w-9/12 rounded-full border-4 p-8 pb-16 pt-16 text-2xl text-white" onclick={leave}
		>Leave Queue</button
	>
</div>
