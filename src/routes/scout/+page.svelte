<script lang="ts">
	import type { AutoInputState, TeamMatch, TeleActionData, TeleAction } from '$lib/types';
	import SuccessFail from '$lib/components/SuccessFail.svelte';
	import Timeline from '$lib/components/Timeline.svelte';
	let actionState: AutoInputState = $state('None');

	const intake_piece = () => (actionState = actionState === 'None' ? 'Intake' : actionState);
	const score_piece = () => (actionState = actionState === 'None' ? 'Score' : actionState);
	const score_tote = (type: 'YourHeld' | 'OtherHeld' | 'External') =>
		(actionState = `Score${type}Tote`);
	const score_low = (type: 'Balloon' | 'Bunny') => (actionState = `Score${type}Low`);

	const complete = (success: boolean) => {
		let action: TeleActionData = {
			action: actionState as TeleAction,

			success: success
		};
		actionState = 'None';
	};

	let { match_key, team_key }: { match_key: string; team_key: string } = $props();
	team_key = '1540';
	let match: TeamMatch = $state({
		team_key,
		match_key,
		auto_actions: [],
		tele_actions: []
	});

	let actions: ActionData[] = $state([]);
	let timelineExtended = $state(false);
	let latestActions: ActionData[] = $state([]);
</script>

<main class="text-zinc-50 flex flex-col p-2 h-svh">
	{#if actionState != 'None'}
		<SuccessFail {complete} cancel={() => (actionState = 'None')} />
	{/if}
	<span class="text-center font-bold pb-2">team {team_key}</span>
	<div class="grid gap-2 grid-cols-2 flex-grow">
		<button class="bg-zinc-500 p-2 rounded" onclick={() => score_low('Balloon')}>
			Score
		</button>
		<button class="bg-zinc-500 p-2 rounded" onclick={() => (actionState = 'Intake')}
			>Intake</button
		>
		<button class="bg-zinc-500 p-2 rounded col-span-2"> Timeline </button>
		<button
			class="bg-btn_grey w-80 p-1 rounded border-2 border-outline_gray static"
			onclick={() => console.log('todo')}>Add Action</button
		>
		<button
			class="bg-btn_grey w-80 p-1 rounded border-2 border-outline_gray static"
			onclick={() => (timelineExtended = !timelineExtended)}>Show Timeline</button
		>
	</div>
	<Timeline bind:actions={latestActions} bind:displaying={timelineExtended} />
</main>
