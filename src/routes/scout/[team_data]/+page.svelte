<script lang="ts">
	import type { TeamMatch, AutoActionData, AutoHeldItems, TeleActionData } from '$lib/types';
	import Timeline from '$lib/components/Timeline.svelte';
	import AutoActionInputs from './AutoActionInputs.svelte';
	import TeleActionInputs from './TeleActionInputs.svelte';
	import type { PageData } from './$types';
	import { ArrowRight, ArrowLeft } from 'lucide-svelte';
	import { browser } from '$app/environment';
	import Postmatch from './Postmatch.svelte';
	import { io } from 'socket.io-client';

	const { data }: { data: PageData } = $props();

	const username = browser ? (localStorage?.getItem('username') ?? '') : '';

	let actions: AutoActionData[] = $state([]);
	let held: AutoHeldItems = $state({
		bunnies: 0,
		balloons: 0,
		totes: 0
	});
	// The furthest index in actions that was made during auto
	let furthest_auto_index = $state(0);

	let speed = $state(3);
	let awareness = $state(3);
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

	const socket = io({
		auth: {
			username
		}
	});

	function submit() {
		const auto_actions = actions.slice(0, furthest_auto_index + 1);
		const tele_actions = actions.slice(furthest_auto_index + 1) as TeleActionData[]; // TODO: Add verification function to ensure that this always works
		const match: TeamMatch = {
			id: 0,
			scout_id: username,
			team_key: data.team_key,
			match_key: data.match_key,
			speed,
			awareness,
			broke,
			died,
			notes,
			auto_actions,
			tele_actions
		};

		socket.emit('submit_team_match', match);
		console.log(match);
	}
</script>

<div class="m-auto flex h-dvh max-w-md flex-col items-center gap-2 p-2">
	<div class="flex w-full justify-between border-b-2 border-white/10 pb-2 font-semibold">
		<h2 class="flex-shrink-0 font-heading font-semibold">Team {data.team_key}</h2>
		<div class="flex gap-2">
			<button
				onclick={phaseShiftLeft}
				class={gamePhase === 'Auto' ? 'pointer-events-none opacity-30' : ''}
				><ArrowLeft /></button
			>
			<h2 class="text-right font-heading font-semibold">{gamePhase}: {pageName}</h2>
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
			class="w-full border-t-2 border-white/10 pt-2 text-center font-heading font-semibold"
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
			class="w-full border-t-2 border-white/10 pt-2 text-center font-heading font-semibold"
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
		<Postmatch bind:awareness bind:speed bind:broke bind:died bind:notes />

		<button onclick={submit} class="mt-auto w-full rounded bg-gunmetal p-2 font-bold"
			>Submit</button
		>
	{/if}
</div>
