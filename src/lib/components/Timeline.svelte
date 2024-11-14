<script lang="ts">
	import type { AutoActionData } from '$lib/types';
	import Action from './Action.svelte';

	let {
		actions = $bindable(),
		displaying = $bindable()
	}: { actions: AutoActionData[]; displaying: boolean } = $props();
	// let latestActions: AutoActionData[] = $derived(actions.toReversed().slice(0, 5));
</script>

<button
	class="fixed inset-0 transition-all {displaying ? 'backdrop-blur' : 'translate-y-full'}"
	onclick={() => (displaying = false)}
>
	<div
		class="absolute h-[50svh] inset-x-0 bottom-0 flex flex-col items-center bg-gunmetal text-white p-1 rounded-t-lg gap-2"
		id="timeline"
	>
		{#each actions as _, i}
			<Action
				action_data={actions[i]}
				deleteself={() => {
					actions.splice(actions.indexOf(actions[i]), 1);
				}}
			/>
		{/each}
		{#if actions.length === 0}
			<h3 class="m-auto">No actions yet :3</h3>
		{/if}
	</div>
</button>
