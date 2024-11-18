<script lang="ts">
	import SuccessFail from '$lib/components/SuccessFail.svelte';
	import type { AutoAction, AutoInputState, AutoActionData } from '$lib/types';

	const { actions = $bindable() }: { actions: AutoActionData[] } = $props();

	let actionState: AutoInputState = $state('None') as AutoInputState;

	let held_bunnies: number = $state(0);
	let held_balloons: number = $state(0);
	let held_totes: number = $state(0);
	const held_scorables: number = $derived(held_balloons + held_bunnies);
	const held_ejectables: number = $derived(held_scorables + held_totes);

	function intake_piece() {
		actionState = actionState === 'None' ? 'Intake' : actionState;
	}
	function score_piece() {
		actionState = actionState === 'None' ? 'Score' : actionState;
	}
	function eject_piece() {
		actionState = actionState === 'None' ? 'Eject' : actionState;
	}

	function score_bunny(where: 'Low' | 'ExternalTote' | 'InternalTote' | 'UncontrolledTote') {
		actionState = `ScoreBunny${where}`;
	}
	function score_balloon(where: 'Low' | 'InternalTote' | 'ExternalTote' | 'UncontrolledTote') {
		actionState = `ScoreBalloon${where}`;
	}
	function complete(success: boolean) {
		// Assume that a failure means a note remains where it is
		if (success) {
			if (actionState.includes('IntakeBalloon')) held_balloons++;
			else if (actionState.includes('IntakeBunny')) held_bunnies++;
			else if (actionState.includes('IntakeTote')) held_totes++;
			else if (actionState.includes('EjectBalloon')) held_balloons--;
			else if (actionState.includes('EjectBunny')) held_bunnies--;
			else if (actionState.includes('EjectTote')) held_totes--;
		}
		// Assume failed scoring is still ejecting
		if (actionState.includes('ScoreBalloon')) held_balloons--;
		else if (actionState.includes('ScoreBunny')) held_bunnies--;

		const action: AutoActionData = {
			action: actionState as AutoAction,
			success: success
		};
		actions.unshift(action); // TODO: Make sure unshift works
		actionState = 'None';
	}

	const is_none_state: boolean = $derived(actionState === 'None');
	const is_intake_state: boolean = $derived(actionState === 'Intake');
	const is_score_state: boolean = $derived(actionState === 'Score');
	const is_eject_state = $derived(actionState === 'Eject');
</script>

<span class="font-bold">Number of pieces currently held: {held_scorables}</span>
<div class="align-center flex w-[80%] min-w-[60%] max-w-96 flex-grow flex-col">
	{#if is_none_state}
		<div class="flex flex-col gap-4">
			<button class="text-md rounded bg-gunmetal p-2 font-bold" onclick={intake_piece}
				>Intake</button
			>
			{#if held_scorables > 0}
				<button class="text-md rounded bg-gunmetal p-2 font-bold" onclick={score_piece}
					>Score</button
				>
			{/if}
			{#if held_ejectables > 0}
				<button class="text-md rounded bg-gunmetal p-2 font-bold" onclick={eject_piece}
					>Eject</button
				>
			{/if}
		</div>
	{:else if is_intake_state}
		<h1 class="w-full text-center text-xl font-bold">Intake</h1>
		<div class="flex flex-grow flex-col gap-4 py-4">
			<button class="rounded bg-gunmetal p-2" onclick={() => (actionState = 'IntakeBunny')}
				>Bunny</button
			>
			<button class="rounded bg-gunmetal p-2" onclick={() => (actionState = 'IntakeTote')}
				>Tote</button
			>
			<button class="rounded bg-gunmetal p-2" onclick={() => (actionState = 'IntakeBalloon')}
				>Balloon From Ground</button
			>
			<button
				class="rounded bg-gunmetal p-2"
				onclick={() => (actionState = 'IntakeBalloonCoral')}>Ballon From Coral</button
			>
		</div>
		<button class="col-span-2 rounded bg-gunmetal p-2" onclick={() => (actionState = 'None')}
			>Cancel</button
		>
	{:else if is_score_state}
		<div class="flex flex-grow flex-col items-center gap-4">
			{#if held_bunnies > 0}
				<h1 class="text-xl font-bold">Score Bunny</h1>
				<div class="-mt-2 grid grid-cols-2 grid-rows-2 gap-2">
					<button class="rounded bg-gunmetal p-2" onclick={() => score_bunny('Low')}
						>Low Zone</button
					>
					<button
						class="rounded bg-gunmetal p-2"
						onclick={() => score_bunny('UncontrolledTote')}>Uncontrolled Tote</button
					>
					{#if held_totes > 0}
						<button
							class="rounded bg-gunmetal p-2"
							onclick={() => score_bunny('InternalTote')}>Internal Held Tote</button
						>
					{/if}
					<button
						class="rounded bg-gunmetal p-2 {held_totes <= 0 ? 'col-span-2' : ''}"
						onclick={() => score_bunny('ExternalTote')}>External Held Tote</button
					>
				</div>
			{/if}
			{#if held_balloons > 0}
				<h1 class="text-xl font-bold">Score Ballon</h1>
				<div class="-mt-2 grid grid-cols-2 grid-rows-2 gap-2">
					<button class="rounded bg-gunmetal p-2" onclick={() => score_balloon('Low')}
						>Low Zone</button
					>
					<button
						class="rounded bg-gunmetal p-2"
						onclick={() => score_balloon('UncontrolledTote')}>Uncontrolled Tote</button
					>
					{#if held_totes > 0}
						<button
							class="rounded bg-gunmetal p-2"
							onclick={() => score_balloon('InternalTote')}>Internal Held Tote</button
						>
					{/if}
					<button
						class="rounded bg-gunmetal p-2 {held_totes <= 0 ? 'col-span-2' : ''}"
						onclick={() => score_balloon('ExternalTote')}
						>External Held Tote
					</button>
				</div>
			{/if}
		</div>
		<button class="w-full rounded bg-gunmetal p-2" onclick={() => (actionState = 'None')}
			>Cancel</button
		>
	{:else if is_eject_state}
		<div class="flex flex-grow flex-col items-center gap-4">
			<h1 class="text-xl font-bold">Eject</h1>
			{#if held_bunnies > 0}
				<button
					class="w-full rounded bg-gunmetal p-2"
					onclick={() => (actionState = 'EjectBunny')}>Bunny</button
				>
			{/if}
			{#if held_balloons > 0}
				<button
					class="w-full rounded bg-gunmetal p-2"
					onclick={() => (actionState = 'EjectBalloon')}>Ballon</button
				>
			{/if}
			{#if held_totes > 0}
				<button
					class="w-full rounded bg-gunmetal p-2"
					onclick={() => (actionState = 'EjectTote')}>Tote</button
				>
			{/if}
		</div>
		<button class="w-full rounded bg-gunmetal p-2" onclick={() => (actionState = 'None')}
			>Cancel</button
		>
	{:else}
		<SuccessFail
			{complete}
			cancel={() =>
				(actionState =
					actionState.substring(0, 1) === 'S'
						? 'Score'
						: actionState.substring(0, 1) === 'E'
							? 'Eject'
							: 'Intake')}
		/>
	{/if}
</div>
