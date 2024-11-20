<script lang="ts">
	import { io } from 'socket.io-client';

	const socket = io({
		auth: {
			token: 'celary'
		}
	});

	let match_key: string = $state('');
	const colors = ['red', 'red', 'red', 'blue', 'blue', 'blue'] as const;
	let teams: string[] = $state(['', '', '', '', '', '']);
	const team_color = $derived(
		teams.map((team, i) => [team, colors[i]] as [string, 'red' | 'blue'])
	);

	const queue_match = () => {
		socket.emit('send_match', [match_key, team_color]);
		match_key = '';
		teams = ['', '', '', '', '', ''];
	};
</script>

<div class="m-4 grid place-items-center gap-4 text-white">
	<input
		bind:value={match_key}
		placeholder="Match Key"
		type="text"
		class="rounded p-2 text-black"
	/>

	<div class="grid grid-flow-col grid-rows-4 gap-2">
		<div class="grid grid-cols-2 grid-rows-1 gap-4 text-xl">
			<h1>Red</h1>
			<h1>Blue</h1>
		</div>
		<div class="row-span-3 grid grid-flow-col grid-cols-2 grid-rows-3 gap-4 text-black">
			{#each teams as _, i}
				<input bind:value={teams[i]} type="text" class="rounded p-1" />
			{/each}
		</div>
	</div>

	<button onclick={queue_match} class="rounded border p-2">Queue Match</button>
</div>
