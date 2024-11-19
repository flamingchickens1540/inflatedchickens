<script lang="ts">
	import type { TeamMatch, AutoActionData } from '$lib/types';
	import Timeline from '$lib/components/Timeline.svelte';
	import ActionInputs from './ActionInputs.svelte';

	const {
		match_key,
		team_key = '1540',
		scout_id
	}: { match_key: string; team_key: string; scout_id: string } = $props();

	let actions: AutoActionData[] = $state([]);
	let timelineExtended = $state(false);
	let pageName = $state('');

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

<div class="m-auto flex h-dvh max-w-md flex-col items-center gap-2 p-2">
	<div class="flex w-full justify-between border-b-2 border-white/10 pb-2 font-semibold">
		<span class="flex-grow">Team {team_key}</span>
		<span class="flex-grow text-right">{pageName}</span>
	</div>

	<ActionInputs bind:actions bind:pageName />

	<button
		class="w-full border-t-2 border-white/10 pt-2 text-center font-semibold"
		onclick={(e: Event) => {
			e.stopPropagation();
			timelineExtended = true;
		}}>Show Timeline</button
	>
	<Timeline bind:actions bind:displaying={timelineExtended} />
</div>
