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

<div class="grid-row-10 grid h-dvh justify-items-center p-2">
	<span class="pb-2 font-bold">Team {team_key}</span>
	<div class="row-span-8">
		<ActionInputs bind:actions />
	</div>

	<button
		class="static row-span-1 h-10 w-80 self-end rounded bg-gunmetal p-1"
		onclick={(e: Event) => {
			e.stopPropagation();
			timelineExtended = true;
		}}>Show Timeline</button
	>
	<Timeline bind:actions bind:displaying={timelineExtended} />
</div>
