<script lang="ts">
	import type { AutoActionData, TeamMatch, TeleActionData } from '$lib/types';
	import { io, Socket } from 'socket.io-client';
	import { LocalStore } from '$lib/localStore.svelte';
	import Modal from './Modal.svelte';

	type SubmittedMatch = {
		status: 'success' | 'pending' | 'failure';
		team_match_key: string;
		color: string;
		timeline: {
			tele_actions: TeleActionData[];
			auto_actions: AutoActionData[];
		} | null;
	};

	let scout_queue: string[] = $state([]);
	let robot_queue: [string, 'red' | 'blue'][] = $state([]);
	let team_matches: LocalStore<SubmittedMatch> = new LocalStore('team_matches', []);

	let show_modal = $state(false);
	let show_verify_modal = $state(false);
	let displayed_team_match: SubmittedMatch = $state({
		status: 'pending',
		team_match_key: '',
		color: 'red',
		timeline: null
	});

	let socket: Socket = io({
		auth: {
			token: 'celary',
			username: 'admin'
		}
	});

	socket.emit('get_scout_queue', (response: { scouts: string[] }) => {
		const scouts = response.scouts;
		scout_queue = scouts;
	});

	socket.emit('get_robot_queue', (response: { robots: [string, 'red' | 'blue'][] }) => {
		const robots = response.robots;
		robot_queue = robots;
	});

	socket.on('robot_joined_queue', (robots: [string, 'red' | 'blue'][]) => {
		robots.reverse().forEach((robot) => robot_queue.push(robot));
	});

	socket.on('robot_left_queue', (robot: [string, 'red' | 'blue']) => {
		const index = robot_queue.findIndex((robot_t) => robotsEqual(robot_t, robot));
		if (index === -1) return;

		robot_queue.splice(index, 1);
	});

	socket.on('scout_joined_queue', (scout: string) => {
		scout_queue.push(scout);
	});

	socket.on('scout_left_queue', (scout: string) => {
		const index = scout_queue.indexOf(scout);
		if (index === -1) return;

		scout_queue.splice(index, 1);
	});

	socket.on('new_team_match', (team_match: TeamMatch) => {
		const team_match_key = `${team_match.match_key} ${team_match.team_key}`;
		const index = team_matches.value.findIndex(
			(pending_team_match) => pending_team_match.team_match_key === team_match_key
		);
		if (index === -1) return;

		team_matches.value.splice(index, 1, {
			status: 'success',
			team_match_key: team_match_key,
			color: team_matches.value[index].color,
			timeline: {
				auto_actions: team_match.auto_actions,
				tele_actions: team_match.tele_actions
			}
		});
	});
	socket.on('failed_team_match', (team_match: TeamMatch) => {
		const team_match_key = `${team_match.match_key} ${team_match.team_key}`;
		const index = team_matches.value.findIndex(
			(pending_team_match) => pending_team_match.team_match_key === team_match_key
		);
		if (index === -1) return;

		team_matches.value.splice(index, 1, {
			status: 'failure',
			team_match_key: team_match_key,
			color: team_matches.value[index].color,
			timeline: {
				auto_actions: team_match.auto_actions,
				tele_actions: team_match.tele_actions
			}
		});
	});

	let match_key: string = $state('');
	const colors = ['red', 'red', 'red', 'blue', 'blue', 'blue'] as const;
	let teams: string[] = $state(['', '', '', '', '', '']);
	const team_color = $derived(
		teams.map((team, i) => [team, colors[i]] as [string, 'red' | 'blue'])
	);

	const queue_match = async () => {
		teams = teams.filter((team) => team != '');
		robot_queue = [];
		teams.toReversed().forEach((team_key, i) =>
			team_matches.value.push({
				status: 'pending',
				team_match_key: `${match_key} ${team_key}`,
				color: team_color[i][1],
				timeline: null
			})
		);
		socket.emit('send_match', [match_key, team_color]);

		await fetch('/api/newmatch', {
			method: 'POST',
			body: JSON.stringify(match_key),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		match_key = '';
		teams = ['', '', '', '', '', ''];
	};

	const remove_scout = (scout_id: string) => {
		const index = scout_queue.indexOf(scout_id);
		if (index === -1) return;

		scout_queue.splice(index, 1);

		socket.emit('leave_scout_queue', scout_id);
	};

	const robotsEqual = (
		robot1: [string, 'red' | 'blue'],
		robot2: [string, 'red' | 'blue']
	): boolean => {
		return robot1[0] === robot2[0] && robot1[1] === robot2[1];
	};

	const remove_robot = (robot: [string, 'red' | 'blue']) => {
		const index = robot_queue.findIndex((robot_t) => robotsEqual(robot_t, robot));
		if (index === -1) return;

		robot_queue.splice(index, 1);

		socket.emit('leave_robot_queue', robot);
	};

	const open_modal = (team_match: SubmittedMatch) => {
		displayed_team_match = team_match;
		show_modal = true;
	};

	const remove_submission = async (team_match: SubmittedMatch) => {
		const index = team_matches.value.indexOf(team_match);
		if (index === -1) return;

		team_matches.value.splice(index, 1);
		const [match_key, team_key] = team_match.team_match_key.split(' ') as [string, string];

		await fetch(`/api/delete/${match_key}/${team_key}/`, {
			method: 'DELETE',
			body: JSON.stringify(match_key),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	};

	const clear_robots = () => {
		if (robot_queue) remove_robot(robot_queue[0]);
		if (robot_queue) clear_robots();
	};

	const clear_submissions = () => {
		if (team_matches) remove_submission(team_matches.value[0]);
		if (team_matches) clear_submissions();
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
				<h1 class="text-red-500">Red</h1>
				<h1 class="text-blue-500">Blue</h1>
			</div>
			<div class="row-span-3 grid grid-flow-col grid-cols-2 grid-rows-3 gap-4 text-black">
				{#each teams as _, i}
					<input bind:value={teams[i]} type="text" class="rounded p-1" />
				{/each}
			</div>
		</div>

		<button onclick={queue_match} class="rounded bg-gunmetal p-4 text-xl font-semibold"
			>Queue Match</button
		>
	</div>
	<div class="grid-rows-13 mt-4 grid grid-cols-1 place-items-center gap-2 text-xl">
		<h1 class="row-span-1">Queued Scouts</h1>
		<div
			class="place-items-justify row-span-12 grid max-h-96 grid-cols-1 gap-2 overflow-y-scroll"
		>
			{#each scout_queue as scout}
				<button
					onclick={() => remove_scout(scout)}
					class="row-span-1 rounded bg-gunmetal p-2 text-center font-semibold"
				>
					{scout}
				</button>
			{/each}
		</div>
	</div>
	<div class="grid grid-cols-1 grid-rows-10 place-items-center gap-2 text-xl">
		<div class="grid grid-cols-4 grid-rows-1 place-items-center">
			<h1 class="col-span-3 row-span-2">Queued Robots</h1>
			<button
				class="col-span-1 ml-1 rounded bg-gunmetal p-2 font-semibold"
				onclick={clear_robots}>Clear</button
			>
		</div>
		<div
			class="place-items-justify row-span-8 grid max-h-96 grid-cols-4 items-center gap-2 overflow-y-scroll rounded"
		>
			{#each robot_queue as [robot, color]}
				<div
					class="col-span-1 rounded-full {color === 'red'
						? 'bg-red-500'
						: 'bg-blue-500'} h-6 w-6"
				></div>
				<button
					onclick={() => remove_robot([robot, color])}
					class="col-span-3 rounded bg-gunmetal p-2 pl-4 pr-4 text-center font-semibold"
				>
					{robot}
				</button>
			{/each}
		</div>
	</div>
	<div class="grid grid-cols-1 grid-rows-7 place-items-center gap-2 text-xl">
		<div class="row-span-1 grid grid-cols-4 grid-rows-1 place-items-center">
			<h1 class="col-span-3 row-span-2">Team-Match Submissions</h1>
			<button
				class="col-span-1 ml-1 rounded bg-gunmetal p-2 font-semibold"
				onclick={clear_submissions}>Clear</button
			>
		</div>
		<div
			class="place-items-justify row-span-6 grid max-h-96 grid-cols-5 items-center gap-2 overflow-y-scroll rounded"
		>
			{#each team_matches.value as team_match}
				<div
					class="col-span-1 rounded-full {team_match.status === 'success'
						? 'bg-green-500'
						: team_match.status === 'pending'
							? 'bg-orange-500'
							: 'bg-red-500'} row-span-1 h-6 w-6"
				></div>
				<button
					onclick={() => open_modal(team_match)}
					class="col-span-4 row-span-1 rounded bg-gunmetal p-2 pl-4 pr-4 text-center font-semibold"
				>
					{team_match.team_match_key}
				</button>
			{/each}
		</div>
	</div>
	<Modal bind:show_modal>
		{#snippet header()}
			<div
				class="place-items-justify align-center grid grid-cols-6 p-2 font-semibold text-white"
			>
				<div
					class="col-span-1 rounded-full {displayed_team_match.status === 'success'
						? 'bg-green-500'
						: displayed_team_match.status === 'pending'
							? 'bg-orange-500'
							: 'bg-red-500'} h-6 w-6"
				></div>
				<h1 class="col-span-3 rounded text-xl">{displayed_team_match.team_match_key}</h1>
				<div
					class="col-span-1 rounded-full {displayed_team_match.color === 'red'
						? 'bg-red-500'
						: 'bg-blue-500'} h-6 w-6"
				></div>
				<button
					onclick={() => (show_verify_modal = true)}
					class="col-span-1 rounded bg-gunmetal p-2 text-xl">Delete</button
				>
			</div>
		{/snippet}
		<div class="grid grid-rows-2 gap-2 rounded text-white">
			{#if displayed_team_match.timeline !== null}
				<div class="grid">
					<h1 class="text-xl font-semibold">Auto</h1>
					<div
						class="align-center grid h-20 grid-flow-col grid-rows-1 place-items-center gap-10 overflow-x-scroll"
					>
						{#each displayed_team_match.timeline?.auto_actions as auto_action}
							<div
								class="align-center grid w-64 grid-cols-6 rounded bg-gunmetal p-4 text-center"
							>
								<div
									class="col-span-1 grid rounded-full {auto_action.success
										? 'bg-green-500'
										: 'bg-red-500'} h-6 w-6"
								></div>
								<div
									class="align-center col-span-5 grid h-10 w-16 text-center font-semibold"
								>
									{auto_action.action}
								</div>
							</div>
						{/each}
					</div>
				</div>
				<div class="grid">
					<h1 class="text-xl font-semibold">Tele</h1>
					<div
						class="align-center grid h-20 grid-flow-col grid-rows-1 place-items-center gap-10 overflow-x-scroll"
					>
						{#each displayed_team_match.timeline?.tele_actions as tele_action}
							<div
								class="align-center grid w-64 grid-cols-6 rounded bg-gunmetal p-4 text-center"
							>
								<div
									class="col-span-1 grid rounded-full {tele_action.success
										? 'bg-green-500'
										: 'bg-red-500'} h-6 w-6"
								></div>
								<div
									class="align-center col-span-5 grid h-10 w-16 text-center font-semibold"
								>
									{tele_action.action}
								</div>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
		<button
			class="m-2 w-full rounded bg-gunmetal p-2 text-xl text-white"
			onclick={() => (show_modal = false)}>Close</button
		>
	</Modal>

	<Modal bind:show_modal={show_verify_modal}>
		{#snippet header()}
			<h1 class="rounded text-center text-xl font-semibold text-white">Are You Sure?</h1>
		{/snippet}
		<div class="place-items-justify grid grid-cols-2 gap-2 bg-eerie_black p-4 text-white">
			<button
				class="rounded bg-gunmetal p-2 text-xl"
				onclick={() => {
					remove_submission(displayed_team_match);
					show_verify_modal = false;
					show_modal = false;
				}}>Yes</button
			>
			<button
				class="rounded bg-gunmetal p-2 text-xl"
				onclick={() => (show_verify_modal = false)}>No</button
			>
		</div>
	</Modal>
</div>
