<script lang="ts">
	import { ActionInputVerifier } from '$lib/ActionInputStateMachine.svelte';
	import type { AutoActionData, AutoHeldItems, TeleHeldItems } from '$lib/types';
	import Action from './Action.svelte';

	let {
		actions = $bindable(),
		held = $bindable(),
		displaying = $bindable()
	}: {
		actions: AutoActionData[];
		held: AutoHeldItems | TeleHeldItems;
		displaying: boolean;
	} = $props();

	/// Determine if currying is the right solution or if we should use a binding
	function remove(index: number) {
		actions.splice(index, 1);
		verify();
	}

	function shift(index: number, change: -1 | 1) {
		[actions[index], actions[index + change]] = [actions[index + change], actions[index]];
		verify();
	}

	function verify() {
		const action_input_verifier = new ActionInputVerifier();
		action_input_verifier.verify_actions(actions);
		// TODO: Fix this horrible and jank solution
		held = Object.hasOwn(held, 'bunnies')
			? action_input_verifier.get_held_auto()
			: action_input_verifier.get_held_tele();
	}
	const is_valid_timeline = $derived(actions.filter((action) => !action.ok).length === 0);
</script>

<button
	class="fixed inset-0 transition-all {displaying ? 'backdrop-blur' : 'translate-y-full'}"
	onclick={(e: Event) => {
		if (e.target === e.currentTarget && is_valid_timeline) {
			displaying = false;
		}
	}}
>
	<div
		class="absolute inset-x-0 bottom-0 flex h-[50dvh] w-dvw flex-col items-center gap-3 rounded-t-lg bg-gunmetal p-3 text-white"
		id="timeline"
	>
		{#each actions as _, i}
			<Action
				action_data={actions[actions.length - i - 1]}
				index={actions.length - i - 1}
				{remove}
				{shift}
			/>
		{/each}
		{#if actions.length === 0}
			<h3 class="m-auto">No actions yet :3</h3>
		{/if}
	</div>
</button>
