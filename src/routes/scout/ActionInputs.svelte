<script lang="ts">
	import SuccessFail from '$lib/components/SuccessFail.svelte';
	import type { AutoAction, AutoInputState, AutoActionData } from '$lib/types';

	const { actions = $bindable() }: { actions: AutoActionData[] } = $props();

	let actionState: AutoInputState = $state('None') as AutoInputState;

	let held_bunnies: number = $state(0);
	let held_balloons: number = $state(0);
	let held_totes: number = $state(0);
	let held_pieces: number = $derived(held_balloons + held_bunnies);

	function intake_piece() {
		actionState = actionState === 'None' ? 'Intake' : actionState;
	}
	function score_piece() {
		if (held_pieces < 1) return;
		actionState = actionState === 'None' ? 'Score' : actionState;
	}
	function score_bunny(where: 'Low' | 'ExternalTote' | 'InternalTote' | 'UncontrolledTote') {
		actionState = `ScoreBunny${where}`;
	}
	function score_balloon(where: 'Low' | 'InternalTote' | 'ExternalTote' | 'UncontrolledTote') {
		actionState = `ScoreBalloon${where}`;
	}
	function complete(success: boolean) {
		// Assume that the robot ejects even if they fail to score
		if (actionState.includes('IntakeBalloon')) held_balloons++;
		else if (actionState.includes('IntakeBunny')) held_bunnies++;
		else if (actionState.includes('IntakeTote')) held_totes++;
		else if (actionState.includes('ScoreBalloon')) held_balloons--;
		else if (actionState.includes('ScoreBunny')) held_bunnies--;

		const action: AutoActionData = {
			action: actionState as AutoAction,
			success: success
		};
		actions.push(action);
		actionState = 'None';
	}

	const is_none_state = $derived(actionState === 'None');
	const is_intake_state = $derived(actionState === 'Intake');
	const is_score_state = $derived(actionState === 'Score');
</script>

<h1>Number of pieces currently held: {held_pieces}</h1>
<div class="grid gap-2 grid-cols-1 grid-rows-2 place-items-center">
	{#if is_none_state}
		<div class="grid gap-2 grid-cols-2">
			<button class="bg-zinc-500 p-2 rounded" onclick={intake_piece}>Intake</button>
			<button class="bg-zinc-500 p-2 rounded" onclick={score_piece}>Score</button>
		</div>
	{:else if is_intake_state}
		<div class="grid gap-3 grid-cols-2 grid-rows-2 flex-grow">
			<button class="bg-zinc-500 p-2 rounded" onclick={() => (actionState = 'IntakeBunny')}
				>Intake Bunny</button
			>
			<button class="bg-zinc-500 p-2 rounded" onclick={() => (actionState = 'IntakeTote')}
				>Intake Tote</button
			>
			<button class="bg-zinc-500 p-2 rounded" onclick={() => (actionState = 'IntakeBalloon')}
				>Intake Balloon From Ground</button
			>
			<button
				class="bg-zinc-500 p-2 rounded"
				onclick={() => (actionState = 'IntakeBalloonCoral')}
				>Intake Ballon From Coral</button
			>
			<button
				class="bg-zinc-500 col-span-2 p-2 rounded"
				onclick={() => (actionState = 'None')}>Cancel</button
			>
		</div>
	{:else if is_score_state}
		<div class="grid gap-2 grid-cols-2 grid-rows-4">
			{#if held_bunnies > 0}
				<button class="bg-zinc-500 p-2 rounded" onclick={() => score_bunny('Low')}
					>Score Bunny in Low Zone</button
				>
				<button
					class="bg-zinc-500 p-2 rounded"
					onclick={() => score_bunny('UncontrolledTote')}
					>Score Bunny in Uncontrolled Tote</button
				>
				{#if held_totes > 0}
					<button
						class="bg-zinc-500 p-2 rounded"
						onclick={() => score_bunny('InternalTote')}
						>Score Bunny in Internal Held Tote</button
					>
				{/if}
				<button class="bg-zinc-500 p-2 rounded" onclick={() => score_bunny('ExternalTote')}
					>Score Bunny in External Held Tote</button
				>
			{/if}
			{#if held_balloons > 0}
				<button class="bg-zinc-500 p-2 rounded" onclick={() => score_balloon('Low')}
					>Score Ballon in Low Zone</button
				>
				<button
					class="bg-zinc-500 p-2 rounded"
					onclick={() => score_balloon('UncontrolledTote')}
					>Score Bunny in Uncontrolled Tote</button
				>
				{#if held_totes > 0}
					<button
						class="bg-zinc-500 p-2 rounded"
						onclick={() => score_balloon('InternalTote')}
						>Score Balloon in Internal Held Tote</button
					>
				{/if}
				<button
					class="bg-zinc-500 p-2 rounded"
					onclick={() => score_balloon('ExternalTote')}
					>Score Balloon in External Held Tote
				</button>
			{/if}
			<button
				class="bg-zinc-500 col-span-2 p-2 rounded"
				onclick={() => (actionState = 'None')}>Cancel</button
			>
		</div>
	{:else}
		<SuccessFail
			{complete}
			cancel={() => (actionState = actionState.substring(0, 1) === 'S' ? 'Score' : 'Intake')}
		/>
	{/if}
</div>
