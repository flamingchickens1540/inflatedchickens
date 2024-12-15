<script lang="ts">
	import { ActionInputVerifier } from '$lib/ActionInputStateMachine.svelte';
	import SuccessFail from '$lib/components/SuccessFail.svelte';
	import type { AutoAction, AutoInputState, AutoActionData, AutoHeldItems } from '$lib/types';

	let {
		actions = $bindable(),
		timeline_extended = $bindable(),
		held = $bindable(),
		furthest_auto_index = $bindable(),
		pageName = $bindable()
	}: {
		actions: AutoActionData[];
		timeline_extended: boolean;
		held: AutoHeldItems;
		furthest_auto_index: number;
		pageName: string;
	} = $props();

	let actionState: AutoInputState = $state('None') as AutoInputState;

	const held_scorables: number = $derived(held.balloons + held.bunnies);
	const held_ejectables: number = $derived(held_scorables + held.totes);

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
			if (actionState.includes('IntakeBalloon')) held.balloons++;
			else if (actionState.includes('IntakeBunny')) held.bunnies++;
			else if (actionState.includes('IntakeTote')) held.totes++;
			else if (actionState.includes('EjectBalloon')) held.balloons--;
			else if (actionState.includes('EjectBunny')) held.bunnies--;
			else if (actionState.includes('EjectTote')) held.totes--;
		}
		// Assume failed scoring is still ejecting
		if (actionState.includes('ScoreBalloon')) held.balloons--;
		else if (actionState.includes('ScoreBunny')) held.bunnies--;

		const action: AutoActionData = {
			action: actionState as AutoAction,
			success: success,
			ok: true
		};
		actions.splice(furthest_auto_index, 0, action);
		furthest_auto_index++;

		/// It's possible for a scout to go back and perform an action in auto that isn't valid, this prevents mistakes
		/// Ideally, the auto state would be preserved and influence the tele state, but not the other way around
		/// So while validation goes one way now, it really should go the other
		verify();
		let ok = true;
		actions.forEach((action) => (ok &&= action.ok));
		timeline_extended = !ok;

		actionState = 'None';
	}
	function verify() {
		const action_input_verifier = new ActionInputVerifier();
		action_input_verifier.verify_actions(actions);
		// TODO: Fix this horrible and jank solution
		held = Object.hasOwn(held, 'bunnies')
			? (action_input_verifier.get_held_auto() as AutoHeldItems)
			: (action_input_verifier.get_held_tele() as AutoHeldItems);
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
			<button class="rounded bg-steel_blue p-2" onclick={intake_piece}>Intake</button>
			<button
				class="rounded bg-steel_blue p-2 {held_scorables > 0
					? ''
					: 'pointer-events-none opacity-30'}"
				onclick={score_piece}>Score</button
			>
			<button
				class="rounded bg-steel_blue p-2 {held_ejectables > 0
					? ''
					: 'pointer-events-none opacity-30'}"
				onclick={eject_piece}>Eject</button
			>
		</div>
	{:else if is_intake_state}
		<div
			class="grid w-full flex-grow grid-cols-2 grid-rows-2 gap-2 py-2 font-heading text-xl font-bold"
		>
			<button class="rounded bg-steel_blue p-2" onclick={() => (actionState = 'IntakeBunny')}
				>Bunny</button
			>
			<button class="rounded bg-steel_blue p-2" onclick={() => (actionState = 'IntakeTote')}
				>Tote</button
			>
			<button
				class="rounded bg-steel_blue p-2"
				onclick={() => (actionState = 'IntakeBalloon')}>Balloon: Ground</button
			>
			<button
				class="rounded bg-steel_blue p-2"
				onclick={() => (actionState = 'IntakeBalloon')}>Balloon: Coral</button
			>
		</div>
		<button
			class="w-full rounded bg-steel_blue p-2 text-xl"
			onclick={() => (actionState = 'None')}>Cancel</button
		>
	{:else if is_score_state}
		<div
			class="flex w-full flex-grow flex-col items-center gap-2 py-2 font-heading text-lg font-bold"
		>
			<div
				class="flex w-full flex-grow flex-col items-center gap-2 text-lg {held.bunnies > 0
					? ''
					: 'pointer-events-none opacity-30'}"
			>
				<h1>Bunny</h1>
				<div class="grid w-full flex-grow grid-cols-2 grid-rows-2 gap-2">
					<button class="rounded bg-steel_blue p-2" onclick={() => score_bunny('Low')}
						>Low Zone</button
					>
					<button
						class="rounded bg-steel_blue p-2"
						onclick={() => score_bunny('UncontrolledTote')}>Uncontrolled Tote</button
					>
					<button
						class="rounded bg-steel_blue p-2 {held.totes > 0
							? ''
							: 'pointer-events-none opacity-30'}"
						onclick={() => score_bunny('InternalTote')}>Internal Held Tote</button
					>
					<button
						class="rounded bg-steel_blue p-2"
						onclick={() => score_bunny('ExternalTote')}>External Held Tote</button
					>
				</div>
			</div>
			<div
				class="flex w-full flex-grow flex-col items-center gap-2 py-2 text-lg {held.balloons >
				0
					? ''
					: 'pointer-events-none opacity-30'}"
			>
				<h1>Balloon</h1>
				<div class="grid w-full flex-grow grid-cols-2 grid-rows-2 gap-2">
					<button class="rounded bg-steel_blue p-2" onclick={() => score_balloon('Low')}
						>Low Zone</button
					>
					<button
						class="rounded bg-steel_blue p-2"
						onclick={() => score_balloon('UncontrolledTote')}>Uncontrolled Tote</button
					>
					<button
						class="rounded bg-steel_blue p-2 {held.totes > 0
							? ''
							: 'pointer-events-none opacity-30'}"
						onclick={() => score_balloon('InternalTote')}>Internal Held Tote</button
					>
					<button
						class="rounded bg-steel_blue p-2"
						onclick={() => score_balloon('ExternalTote')}
						>External Held Tote
					</button>
				</div>
			</div>
			<button class="w-full rounded bg-steel_blue p-2" onclick={() => (actionState = 'None')}
				>Cancel</button
			>
		</div>
	{:else if is_eject_state}
		<div class="grid w-full flex-grow grid-flow-row gap-2 py-2 font-heading font-bold">
			<button
				class="w-full rounded bg-steel_blue p-2 {held.bunnies > 0
					? ''
					: 'pointer-events-none opacity-30'}"
				onclick={() => (actionState = 'EjectBunny')}>Bunny</button
			>
			<button
				class="w-full rounded bg-steel_blue p-2 {held.balloons > 0
					? ''
					: 'pointer-events-none opacity-30'}"
				onclick={() => (actionState = 'EjectBalloon')}>Balloon</button
			>
			<button
				class="w-full rounded bg-steel_blue p-2 {held.totes > 0
					? ''
					: 'pointer-events-none opacity-30'}"
				onclick={() => (actionState = 'EjectTote')}>Tote</button
			>
		</div>
		<button class="w-full rounded bg-steel_blue p-2" onclick={() => (actionState = 'None')}
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
