<script lang="ts">
	import SuccessFail from '$lib/components/SuccessFail.svelte';
	import type { AutoAction, AutoInputState, AutoActionData } from '$lib/types';

	const { actions = $bindable() }: { actions: AutoActionData[] } = $props();

	let actionState: AutoInputState = $state('None') as AutoInputState;
	let held_pieces: number = $state(0);

	function intake_piece() {
		actionState = actionState === 'None' ? 'Intake' : actionState;
	}
	function score_piece() {
		if (held_pieces < 1) return;
		actionState = actionState === 'None' ? 'Score' : actionState;
	}
	function complete(success: boolean) {
		// Assume that the robot ejects even if they fail to score
		if (actionState.substring(0, 5) === 'Score') held_pieces--;
		else if (actionState.substring(0, 6) === 'Intake' && success) held_pieces++;

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

<div class="grid gap-2 grid-cols-1 grid-rows-2 flex-grow">
	<p>Number of pieces currently held: {held_pieces}</p>
	{#if is_none_state}
		<div class="grid gap-2 grid-cols-2 flex-grow">
			<button class="bg-zinc-500 p-2 rounded" onclick={intake_piece}>Intake</button>
			<button class="bg-zinc-500 p-2 rounded" onclick={score_piece}>Score</button>
		</div>
	{:else if is_intake_state}
		<div class="grid gap-2 grid-cols-2 grid-rows-2 flex-grow">
			<button class="bg-zinc-500 p-2 rounded" onclick={() => (actionState = 'IntakeBunny')}
				>Intake Bunny</button
			>
			<button class="bg-zinc-500 p-2 rounded" onclick={() => (actionState = 'IntakeTote')}
				>Intake Tote</button
			>
			<button class="bg-zinc-500 p-2 rounded" onclick={() => (actionState = 'IntakeBalloon')}
				>Intake Balloon From Ground</button
			>
			<button class="bg-zinc-500 p-2 rounded" onclick={() => (actionState = 'IntakeCoral')}
				>Intake Ballon From Coral</button
			>
		</div>
	{:else if is_score_state}
		<div class="grid gap-2 grid-cols-2 grid-rows-3 flex-grow">
			<button class="bg-zinc-500 p-2 rounded" onclick={() => (actionState = 'ScoreBunnyLow')}
				>Score Bunny in Low Zone</button
			>
			<button class="bg-zinc-500 p-2 rounded" onclick={() => (actionState = 'ScoreBunnyTote')}
				>Score Bunny in Tote</button
			>
			<button
				class="bg-zinc-500 p-2 rounded"
				onclick={() => (actionState = 'ScoreBalloonLow')}>Score Ballon in Low Zone</button
			>
			<button
				class="bg-zinc-500 p-2 rounded"
				onclick={() => (actionState = 'ScoreExternalTote')}
				>Score Bunny in Uncontrolled Tote</button
			>
			<button
				class="bg-zinc-500 p-2 rounded"
				onclick={() => (actionState = 'ScoreYourHeldTote')}
				>Score Bunny in Your Held Tote</button
			>
			<button
				class="bg-zinc-500 p-2 rounded"
				onclick={() => (actionState = 'ScoreOtherHeldTote')}
				>Score Bunny in Tote Held by Other Robot</button
			>
		</div>
	{:else}
		<SuccessFail {complete} cancel={() => (actionState = 'None')} />
	{/if}
</div>
