<script lang="ts">
	import type { TeamMatch, AutoActionData, AutoHeldItems, TeleActionData } from '$lib/types';
	import Timeline from '$lib/components/Timeline.svelte';
	import AutoActionInputs from './AutoActionInputs.svelte';
	import TeleActionInputs from './TeleActionInputs.svelte';
	import type { PageData } from './$types';
	import { ArrowRight, ArrowLeft } from 'lucide-svelte';
	import { browser } from '$app/environment';

	const { data }: { data: PageData } = $props();

	const scout_id = browser ? (localStorage?.getItem('scout_id') ?? '') : '';

	let actions: AutoActionData[] = $state([]);
	let held: AutoHeldItems = $state({
		bunnies: 0,
		balloons: 0,
		totes: 0
	});
	// The furthest index in actions that was made during auto
	let furthest_auto_index = $state(0);

	let skill = $state(0);
	let broke = $state(false);
	let died = $state(false);
	let notes = $state('');

	let timelineExtended = $state(false);
	let gamePhase = $state('Auto') as 'Auto' | 'Tele' | 'Post';
	let pageName = $state('');

	function phaseShiftRight() {
		gamePhase = gamePhase === 'Auto' ? 'Tele' : gamePhase === 'Tele' ? 'Post' : 'Post'; // Last case should never happen
	}
	function phaseShiftLeft() {
		gamePhase = gamePhase === 'Post' ? 'Tele' : gamePhase === 'Tele' ? 'Auto' : 'Auto'; // Last case should never happen
	}

	function submit() {
		const auto_actions = actions.slice(0, furthest_auto_index + 1);
		const tele_actions = actions.slice(furthest_auto_index + 1) as TeleActionData[]; // TODO: Add verification function to ensure that this always works
		const match: TeamMatch = {
			id: 0,
			scout_id,
			team_key: data.team_key,
			match_key: data.match_key,
			skill,
			broke,
			died,
			notes,
			auto_actions,
			tele_actions
		};
	}
</script>

<div class="m-auto flex h-dvh max-w-md flex-col items-center gap-2 p-2">
	<div class="flex w-full justify-between border-b-2 border-white/10 pb-2 font-semibold">
		<span class="flex-shrink-0">Team {data.team_key}</span>
		<div class="flex gap-2">
			<button
				onclick={phaseShiftLeft}
				class={gamePhase === 'Auto' ? 'pointer-events-none opacity-30' : ''}
				><ArrowLeft /></button
			>
			<span class="text-right">{gamePhase}: {pageName}</span>
			<button
				onclick={phaseShiftRight}
				class={gamePhase === 'Post' ? 'pointer-events-none opacity-30' : ''}
				><ArrowRight /></button
			>
		</div>
	</div>

	{#if gamePhase === 'Auto'}
		<AutoActionInputs bind:furthest_auto_index bind:held bind:actions bind:pageName />
		<button
			class="w-full border-t-2 border-white/10 pt-2 text-center font-semibold"
			onclick={(e: Event) => {
				e.stopPropagation();
				timelineExtended = true;
			}}>Show Timeline</button
		>
		<Timeline
			bind:furthest_auto_index
			bind:held
			bind:actions
			bind:displaying={timelineExtended}
		/>
	{:else if gamePhase === 'Tele'}
		<TeleActionInputs bind:held bind:actions bind:pageName />
		<button
			class="w-full border-t-2 border-white/10 pt-2 text-center font-semibold"
			onclick={(e: Event) => {
				e.stopPropagation();
				timelineExtended = true;
			}}>Show Timeline</button
		>
		<Timeline
			bind:furthest_auto_index
			bind:held
			bind:actions
			bind:displaying={timelineExtended}
		/>
	{:else}
		<div>Postmatch</div>
		<button class="mt-auto w-full rounded bg-gunmetal p-2 font-bold">Submit</button>
	{/if}
</div>
