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
	import { goto } from '$app/navigation';
	import { ActionInputVerifier } from '$lib/ActionInputStateMachine.svelte';

	const { data }: { data: PageData } = $props();

	const username = browser ? (localStorage?.getItem('username') ?? '') : '';

	let actions: AutoActionData[] = $state([]);
	let held: AutoHeldItems = $state({
		bunnies: 0,
		balloons: 0,
		totes: 0
	});
	// The furthest index in actions that was made during auto or pre
	let furthest_pre_index = $state(0);
	let furthest_auto_index = $state(0);
	let preload_bunny = $state(false);

	let quickness = $state(3);
	let awareness = $state(3);
	let broke = $state(false);
	let died = $state(false);
	let notes = $state('');

	let timeline_extended = $state(false);
	let gamePhase = $state('Pre') as 'Pre' | 'Auto' | 'Tele' | 'Post';
	let pageName = $state('Home');

	function phaseShiftRight() {
		gamePhase =
			gamePhase === 'Pre'
				? 'Auto'
				: gamePhase === 'Auto'
					? 'Tele'
					: gamePhase === 'Tele'
						? 'Post'
						: 'Post'; // Last case should never happen
	}
	function phaseShiftLeft() {
		gamePhase =
			gamePhase === 'Post'
				? 'Tele'
				: gamePhase === 'Tele'
					? 'Auto'
					: gamePhase === 'Auto'
						? 'Pre'
						: 'Pre'; // Last case should never happen
	}

	const socket = io({
		auth: {
			username
		}
	});

	async function submit() {
		const _preload_actions = actions.slice(0, furthest_pre_index);
		const auto_actions = actions.slice(furthest_pre_index, furthest_auto_index);
		const tele_actions = actions.slice(furthest_auto_index) as TeleActionData[];

		// console.log(`Preload Actions: ${preload_actions.map((action) => action.action)}`)
		// console.log(`Auto Actions: ${auto_actions.map((action) => action.action)}`)
		// console.log(`Tele Actions: ${tele_actions.map((action) => action.action)}`)

		const match: TeamMatch = {
			id: 0,
			scout_id: username,
			team_key: data.team_key,
			match_key: data.match_key,
			quickness,
			awareness,
			broke,
			died,
			notes,
			auto_actions,
			tele_actions
		};

		const response = await fetch('/api/submit', {
			method: 'POST',
			body: JSON.stringify(match),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!response.ok) {
			console.log('Failed to submit match');
			socket.emit('failed_submit_team_match', match);
		} else {
			console.log(response);
			socket.emit('submit_team_match', match);
		}

		goto('/');
	}

	const increase_pre_balloon = () => {
		actions.splice(furthest_pre_index, 0, {
			action: 'PreloadBalloon',
			success: true,
			ok: true
		});

		furthest_pre_index++;
		furthest_auto_index++;
		held.balloons++;
	};
	const decrease_pre_balloon = () => {
		const verifier = new ActionInputVerifier();
		actions.splice(furthest_pre_index - 1, 1);

		furthest_pre_index--;
		furthest_auto_index--;
		held.balloons--;
		verifier.verify_actions(actions);
	};
	const toggle_pre_bunny = () => {
		let verifier = new ActionInputVerifier();
		let pre_actions = actions.slice(0, furthest_pre_index);
		const index = pre_actions.findIndex((action) => action.action === 'PreloadBunny');
		if (index === -1) {
			actions.splice(furthest_pre_index, 1, {
				action: 'PreloadBunny',
				success: true,
				ok: true
			});
			furthest_pre_index++;
			furthest_auto_index++;
			held.bunnies++;
			preload_bunny = true;
			return;
		}
		actions.splice(index, 1);
		furthest_pre_index--;
		furthest_auto_index--;
		held.bunnies--;
		preload_bunny = false;
		verifier.verify_actions(actions);
		if (!verifier.actions_are_ok(actions)) {
			timeline_extended = true;
		}
	};
</script>

<div class="m-auto flex h-dvh max-w-md flex-col items-center gap-2 p-2">
	<div class="flex w-full justify-between border-b-2 border-white/10 pb-2 font-semibold">
		<h2
			class="flex-shrink-0 font-heading font-semibold {data.color === 'red'
				? 'text-red-500'
				: 'text-blue-500'}"
		>
			Team {data.team_key}
		</h2>
		<div class="flex gap-2">
			<button
				onclick={phaseShiftLeft}
				class={gamePhase === 'Pre' ? 'pointer-events-none opacity-30' : ''}
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

	{#if gamePhase === 'Pre'}
		<div class="grid h-full w-full grid-rows-11">
			<div class="row-span-10 grid grid-rows-10 place-items-center gap-6">
				<span class="row-span-1">You're Scouting:</span>
				<h1
					class="row-span-1 text-5xl {data.color === 'red'
						? 'text-red-500'
						: 'text-blue-500'}"
				>
					{data.team_key}
				</h1>
				<div class="row-span-1">
					<button
						class="rounded bg-gunmetal p-2 pl-4 pr-4 text-center font-semibold {held.balloons ===
						0
							? 'pointer-events-none opacity-30'
							: ''}"
						onclick={decrease_pre_balloon}>-</button
					>
					<span class="rounded bg-gunmetal p-4 text-center font-semibold"
						>Preload Balloon: {held.balloons}</span
					>
					<button
						class="rounded bg-gunmetal p-2 pl-4 pr-4 text-center font-semibold {held.balloons ===
						2
							? 'pointer-events-none opacity-30'
							: ''}"
						onclick={increase_pre_balloon}>+</button
					>
				</div>

				<button
					class="row-span-1 rounded bg-gunmetal p-4 text-center font-semibold"
					onclick={toggle_pre_bunny}
					>Preload Bunny: {preload_bunny ? 'True' : 'False'}
				</button>
			</div>
			<button
				class="row-span-1 h-6 w-full border-t-2 border-white/10 pt-2 text-center font-heading font-semibold"
				onclick={(e: Event) => {
					e.stopPropagation();
					timeline_extended = true;
				}}>Show Timeline</button
			>
			<Timeline
				bind:furthest_auto_index
				bind:held
				bind:actions
				bind:displaying={timeline_extended}
			/>
		</div>
	{:else if gamePhase === 'Auto'}
		<AutoActionInputs
			bind:furthest_auto_index
			bind:held
			bind:actions
			bind:pageName
			bind:timeline_extended
		/>
		<button
			class="w-full border-t-2 border-white/10 pt-2 text-center font-heading font-semibold"
			onclick={(e: Event) => {
				e.stopPropagation();
				timeline_extended = true;
			}}>Show Timeline</button
		>
		<Timeline
			bind:furthest_auto_index
			bind:held
			bind:actions
			bind:displaying={timeline_extended}
		/>
	{:else if gamePhase === 'Tele'}
		<TeleActionInputs bind:held bind:actions bind:pageName />
		<button
			class="w-full border-t-2 border-white/10 pt-2 text-center font-heading font-semibold"
			onclick={(e: Event) => {
				e.stopPropagation();
				timeline_extended = true;
			}}>Show Timeline</button
		>
		<Timeline
			bind:furthest_auto_index
			bind:held
			bind:actions
			bind:displaying={timeline_extended}
		/>
	{:else}
		<Postmatch bind:awareness bind:quickness bind:broke bind:died bind:notes />

		<button onclick={submit} class="mt-auto w-full rounded bg-gunmetal p-2 font-bold"
			>Submit</button
		>
	{/if}
</div>
