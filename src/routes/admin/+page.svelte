<script lang="ts">
	import { io } from 'socket.io-client';

	const socket = io({
		auth: {
			token: 'celary'
		}
	});

	socket.on('messageFromServer', (data) => console.log(data));

	let match_key: string = $state('');
	const colors = ['red', 'red', 'red', 'blue', 'blue', 'blue'] as const;
	const teams: string[] = $state(['', '', '', '', '', '']);
	const team_color = $derived(
		teams.map((team, i) => [team, colors[i]] as [string, 'red' | 'blue'])
	);

	const queue_match = () => {
		socket.emit('send_match', [match_key, team_color]);
	};
</script>

<div class="text-white grid m-4 gap-4 place-items-center">
	<input
		bind:value={match_key}
		placeholder="Match Key"
		type="text"
		class="rounded p-2 text-black"
	/>

	<div class="grid grid-rows-4 grid-flow-col gap-2">
		<div class="grid grid-cols-2 grid-rows-1 text-xl gap-4">
			<h1>Red</h1>
			<h1>Blue</h1>
		</div>
		<div class="grid grid-cols-2 grid-rows-3 row-span-3 gap-4 text-black grid-flow-col">
			{#each teams as _, i}
				<input bind:value={teams[i]} type="text" class="rounded" />
			{/each}
		</div>
	</div>

	<button onclick={queue_match} class="p-2 rounded border">Queue Match</button>
</div>
