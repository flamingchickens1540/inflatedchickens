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
	};

	const shift = (index: number, change: number) => {
		let item = actions[index];
		actions.splice(index, 1);
		actions.splice(index + change, 0, item);
	};

	function verify() {
		actions
			.slice()
			.reverse()
			.forEach(() => {});
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
			<Action action_data={actions[i]} index={i} {remove} {shift} />
		{/each}
		{#if actions.length === 0}
			<h3 class="m-auto">No actions yet :3</h3>
		{/if}
	</div>
</button>
