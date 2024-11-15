<script lang="ts">
	import type { AutoActionData } from '$lib/types';
	import Action from './Action.svelte';

	let {
		actions = $bindable(),
		displaying = $bindable()
	}: { actions: AutoActionData[]; displaying: boolean } = $props();
	// let latestActions: AutoActionData[] = $derived(actions.toReversed().slice(0, 5));

    const remove = (index: number) => {
		actions.splice(index, 1);
	}
	
	const shift = (index: number, change: number) => {
		let item = actions[index];
		actions.splice(index, 1);
		actions.splice(index + change, 0, item);
	}
</script>

<button
	class="fixed inset-0 transition-all {displaying ? 'backdrop-blur' : 'translate-y-full'}"
	onclick={(e: Event) => {if (e.target === e.currentTarget) displaying = false}}
>
	<div
		class="absolute h-[50svh] w-dvw inset-x-0 bottom-0 flex flex-col items-center bg-gunmetal text-white p-3 rounded-t-lg gap-2"
		id="timeline"
	>
		{#each actions as _, i}
			<Action
				action_data={actions[i]}
                index={i}
                remove={remove}
                shift={shift}
			/>
		{/each}
		{#if actions.length === 0}
			<h3 class="m-auto">No actions yet :3</h3>
		{/if}
	</div>
</button>
