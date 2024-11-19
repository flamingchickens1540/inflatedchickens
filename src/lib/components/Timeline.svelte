<script lang="ts">
	import { ActionInputStateMachine } from '$lib/ActionInputStateMachine.svelte';
	import type { AutoActionData } from '$lib/types';
	import Action from './Action.svelte';

	let {
		actions = $bindable(),
		displaying = $bindable()
	}: { actions: AutoActionData[]; displaying: boolean } = $props();

	/// Determine if currying is the right solution or if we should use a binding
	function remove(index: number) {
		actions.splice(index, 1);
		verify();
	}

	function shift(index: number, change: number) {
		let item = actions[index];
		actions.splice(index, 1);
		actions.splice(index + change, 0, item);
		verify();
	}

	function verify() {
		const action_state_machine = new ActionInputStateMachine();
		actions.forEach((action) => {
			action.ok = action_state_machine.new_action(action);
		});
	}
</script>

<button
	class="fixed inset-0 transition-all {displaying ? 'backdrop-blur' : 'translate-y-full'}"
	onclick={(e: Event) => {
		if (e.target === e.currentTarget) displaying = false;
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
