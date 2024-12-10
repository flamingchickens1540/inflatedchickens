<script lang="ts">
	import SuccessFail from '$lib/components/SuccessFail.svelte';
	import type {
		TeleAction,
		TeleInputState,
		TeleActionData,
		AutoHeldItems,
		AutoActionData
	} from '$lib/types';

	let {
		actions = $bindable(),
		held = $bindable(),
		pageName = $bindable()
		// Not a mistake, this is intentional to allow a shared timeline
	}: { actions: AutoActionData[]; held: AutoHeldItems; pageName: string } = $props();

	let actionState: TeleInputState = $state('None') as TeleInputState;

	const held_ejectables: number = $derived(held.balloons + held.totes);

	function intake_piece() {
		actionState = actionState === 'None' ? 'Intake' : actionState;
	}
	function score_piece() {
		actionState = actionState === 'None' ? 'Score' : actionState;
	}
	function eject_piece() {
		actionState = actionState === 'None' ? 'Eject' : actionState;
	}

	function score_balloon(where: 'Low' | 'InternalTote' | 'ExternalTote' | 'UncontrolledTote') {
		actionState = `ScoreBalloon${where}`;
	}
	function complete(success: boolean) {
		// Assume that a failure means a note remains where it is
		if (success) {
			if (actionState.includes('IntakeBalloon')) held.balloons++;
			else if (actionState.includes('IntakeTote')) held.totes++;
			else if (actionState.includes('EjectBalloon')) held.balloons--;
			else if (actionState.includes('EjectTote')) held.totes--;
		}
		// Assume failed scoring is still ejecting
		if (actionState.includes('ScoreBalloon')) held.balloons--;

		const action: TeleActionData = {
			action: actionState as TeleAction,
			success: success,
			ok: true
		};
		actions.push(action); // This is fine because TeleActionData is a subset of AutoActionData
		actionState = 'None';
	}

	const is_none_state: boolean = $derived(actionState === 'None');
	const is_intake_state: boolean = $derived(actionState === 'Intake');
	const is_score_state: boolean = $derived(actionState === 'Score');
	const is_eject_state = $derived(actionState === 'Eject');

	$effect(() => {
		pageName = actionState === 'None' ? 'Home' : actionState;
	});
</script>

<div class="align-center flex w-full max-w-md flex-grow flex-col px-2">
	{#if is_none_state}
		<div
			class="grid flex-grow grid-cols-1 grid-rows-3 gap-2 py-2 font-heading text-2xl font-bold"
		>
			<button class="rounded bg-gunmetal p-2" onclick={intake_piece}>Intake</button>
			{#if held.balloons > 0}
				<button class="rounded bg-gunmetal p-2" onclick={score_piece}>Score</button>
			{/if}
			{#if held_ejectables > 0}
				<button class="rounded bg-gunmetal p-2" onclick={eject_piece}>Eject</button>
			{/if}
		</div>
	{:else if is_intake_state}
		<div
			class="grid w-full flex-grow grid-cols-2 grid-rows-2 gap-2 py-2 font-heading text-xl font-bold"
		>
			<button
				class="col-span-2 rounded bg-gunmetal p-2"
				onclick={() => (actionState = 'IntakeTote')}>Tote</button
			>
			<button class="rounded bg-gunmetal p-2" onclick={() => (actionState = 'IntakeBalloon')}
				>Balloon: Ground</button
			>
			<button
				class="rounded bg-gunmetal p-2"
				onclick={() => (actionState = 'IntakeBalloonCoral')}>Balloon: Coral</button
			>
		</div>
		<button
			class="w-full rounded bg-gunmetal p-2 text-xl"
			onclick={() => (actionState = 'None')}>Cancel</button
		>
	{:else if is_score_state}
		<div
			class="flex w-full flex-grow flex-col items-center gap-2 py-2 font-heading text-lg font-bold"
		>
			<div class="flex w-full flex-grow flex-col items-center gap-2 py-2 text-lg">
				<h1>Balloon</h1>
				<div class="grid w-full flex-grow grid-cols-2 grid-rows-2 gap-2">
					<button class="rounded bg-gunmetal p-2" onclick={() => score_balloon('Low')}
						>Low Zone</button
					>
					<button
						class="rounded bg-gunmetal p-2"
						onclick={() => score_balloon('UncontrolledTote')}>Uncontrolled Tote</button
					>
					{#if held.totes > 0}
						<button
							class="rounded bg-gunmetal p-2"
							onclick={() => score_balloon('InternalTote')}>Internal Held Tote</button
						>
					{/if}
					<button
						class="rounded bg-gunmetal p-2 {held.totes <= 0 ? 'col-span-2' : ''}"
						onclick={() => score_balloon('ExternalTote')}
						>External Held Tote
					</button>
				</div>
			</div>
			<button class="w-full rounded bg-gunmetal p-2" onclick={() => (actionState = 'None')}
				>Cancel</button
			>
		</div>
	{:else if is_eject_state}
		<div class="grid w-full flex-grow grid-flow-row gap-2 py-2 font-heading font-bold">
			{#if held.balloons > 0}
				<button
					class="w-full rounded bg-gunmetal p-2"
					onclick={() => (actionState = 'EjectBalloon')}>Balloon</button
				>
			{/if}
			{#if held.totes > 0}
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
