<script lang="ts">
	import { type TeamMatch, type AutoActionData } from '$lib/types';
	import Timeline from '$lib/components/Timeline.svelte';
	import ActionInputs from './ActionInputs.svelte';

	const {
		match_key,
		team_key = '1540',
		scout_id
	}: { match_key: string; team_key: string; scout_id: string } = $props();

	let actions: AutoActionData[] = $state([]);
	let timelineExtended = $state(false);
	let latestActions: AutoActionData[] = $state([]);

	const match: TeamMatch = $state({
		id: 0,
		scout_id,
		team_key,
		match_key,
		skill: 3,
		notes: '',
		broke: false,
		died: false,
		auto_actions: [],
		tele_actions: []
	});
</script>

<div class="text-zinc-50 p-2 h-svh">
	<h1 class="text-center font-bold pb-2 h-5">Team {team_key}</h1>
	{#if timelineExtended}
		<Timeline bind:actions={latestActions} bind:displaying={timelineExtended} />
	{:else}
		<ActionInputs bind:actions />
		<button
			class="bg-btn_grey h-10 w-80 p-1 rounded border-2 border-outline_gray static"
			onclick={() => (timelineExtended = !timelineExtended)}>Show Timeline</button
		>
	{/if}
</div>
