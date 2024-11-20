<script lang="ts">
	import type { TeamMatch, AutoActionData, AutoHeldItems } from '$lib/types';
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
</script>

<div class="m-auto flex h-dvh max-w-md flex-col items-center gap-2 p-2">
	<div class="flex w-full justify-between border-b-2 border-white/10 pb-2 font-semibold">
		<span class="">Team {data.team_key}</span>
		{#if gamePhase !== 'Auto'}
			<button onclick={phaseShiftLeft} class=""><ArrowLeft /></button>
		{/if}
		<span class="text-right">{gamePhase}: {pageName}</span>
		{#if gamePhase === 'Post'}
			<button class="rounded border pl-2 pr-2">Submit </button>
		{:else}
			<button onclick={phaseShiftRight} class=""><ArrowRight /></button>
		{/if}
	</div>

	{#if gamePhase === 'Auto'}
		<AutoActionInputs bind:held bind:actions bind:pageName />
		<button
			class="w-full border-t-2 border-white/10 pt-2 text-center font-semibold"
			onclick={(e: Event) => {
				e.stopPropagation();
				timelineExtended = true;
			}}>Show Timeline</button
		>
		<Timeline bind:held bind:actions bind:displaying={timelineExtended} />
	{:else if gamePhase === 'Tele'}
		<TeleActionInputs bind:held bind:actions bind:pageName />
		<button
			class="w-full border-t-2 border-white/10 pt-2 text-center font-semibold"
			onclick={(e: Event) => {
				e.stopPropagation();
				timelineExtended = true;
			}}>Show Timeline</button
		>
		<Timeline bind:held bind:actions bind:displaying={timelineExtended} />
	{:else}
		<div>Postmatch</div>
	{/if}
</div>
