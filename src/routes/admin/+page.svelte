<script lang="ts">
	import { io, Socket } from 'socket.io-client';

	let scout_queue: string[] = $state([]);

	let socket: Socket = io({
		auth: {
			token: 'celary'
		}
	});

	socket.on('scout_joined_queue', (scout: string) => {
		scout_queue.push(scout);
	});

	socket.on('scout_left_queue', (scout: string) => {
		const index = scout_queue.indexOf(scout);
		if (index === -1) return;

		scout_queue.splice(index, 1);
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

	const remove_scout = (scout_id: string) => {
		const index = scout_queue.indexOf(scout_id);
		if (index === -1) return;

		scout_queue.splice(index, 1);

		socket.emit('leave_queue', scout_id);
	};
</script>

<div class="grid grid-cols-2 grid-rows-2 gap-6">
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
	<div class="mt-4 grid grid-cols-1 grid-rows-10 place-items-center gap-4 text-xl">
		<h1 class="row-span-2">Queued Scouts</h1>
		<div class="row-span-8 grid grid-cols-1 grid-rows-8 gap-2">
			{#each scout_queue as scout}
				<button onclick={() => remove_scout(scout)} class="rounded border p-2 text-center">
					{scout}
				</button>
			{/each}
		</div>
	</div>
</div>
