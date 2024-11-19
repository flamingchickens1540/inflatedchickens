<script lang="ts">
	import { type TeamMatch, type AutoActionData } from '$lib/types';
	import Timeline from '$lib/components/Timeline.svelte';
	import ActionInputs from './ActionInputs.svelte';
	import { browser } from '$app/environment';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const scout_id = browser ? localStorage.getItem('scout_id')! : '';

	let actions: AutoActionData[] = $state([]);
	let timelineExtended = $state(false);

	const match: TeamMatch = $state({
		id: 0,
		scout_id: scout_id,
		team_key: data.team_key,
		match_key: data.match_key,
		skill: 3,
		notes: '',
		broke: false,
		died: false,
		auto_actions: [],
		tele_actions: []
	});
</script>

<div class="grid grid-row-10 text-zinc-50 p-2 h-svh place-items-center">
	<h1 class="row-span-1 text-center font-bold pb-2 h-5">Team {data.team_key}</h1>
	{#if timelineExtended}
		<div class="row-span-8">
			<Timeline bind:actions />
		</div>
		<button
			class="row-span-1 bg-btn_grey h-10 w-80 p-1 rounded border-2 border-outline_gray static"
			onclick={() => (timelineExtended = false)}>Hide Timeline</button
		>
	{:else}
		<div class="row-span-8">
			<ActionInputs bind:actions />
		</div>

		<button
			class="row-span-1 bg-btn_grey h-10 w-80 p-1 rounded border-2 border-outline_gray static"
			onclick={() => (timelineExtended = true)}>Show Timeline</button
		>
	{/if}
</div>
