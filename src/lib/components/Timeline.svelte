<script lang="ts">
	import { ActionInputVerifier } from '$lib/ActionInputStateMachine.svelte';
	import type { AutoActionData, AutoHeldItems, TeleHeldItems } from '$lib/types';
	import Action from './Action.svelte';

	let {
		actions = $bindable(),
		held = $bindable(),
		furthest_auto_index = $bindable(),
		displaying = $bindable()
	}: {
		actions: AutoActionData[];
		held: AutoHeldItems | TeleHeldItems;
		furthest_auto_index: number;
		displaying: boolean;
	} = $props();

	/// Determine if currying is the right solution or if we should use a binding
	function remove(index: number) {
		if (furthest_auto_index >= index) furthest_auto_index--;
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
		console.log(actions);
		// TODO: Fix this horrible and jank solution
		held = Object.hasOwn(held, 'bunnies')
			? action_input_verifier.get_held_auto()
			: action_input_verifier.get_held_tele();
	}
	const is_valid_timeline: boolean = $derived(!actions.find((action) => !action.ok));
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
		class="no-scrollbar absolute inset-x-0 bottom-0 flex h-[50dvh] w-dvw flex-col items-center gap-3 overflow-y-scroll rounded-t-lg bg-gunmetal p-3 text-white"
		id="timeline"
	>
		{#each actions as _, i}
			<Action
				action_data={actions[actions.length - i - 1]}
				index={actions.length - i - 1}
				{remove}
				{shift}
			/>
			{#if furthest_auto_index === actions.length - i - 1}
				<hr />
			{/if}
		{/each}
		{#if actions.length === 0}
			<h3 class="m-auto font-heading font-bold">No actions yet :3</h3>
		{/if}
	</div>
</button>
