<script lang="ts">
	import { clickoutside } from '@svelte-put/clickoutside';
	import type { AutoActionData } from '$lib/types';
	import Action from './Action.svelte';

	let {
		actions = $bindable(),
		displaying = $bindable()
	}: { actions: AutoActionData[]; displaying: boolean } = $props();
	// let latestActions: AutoActionData[] = $derived(actions.toReversed().slice(0, 5));
</script>

<div
	class="flex flex-col items-center bg-gunmetal text-white p-1 rounded-t-lg transition-transform gap-2 fixed h-[50svh] inset-x-0 bottom-0
    {displaying ? '' : 'translate-y-full'}"
	id="timeline"
	use:clickoutside
	onclickoutside={() => (displaying = false)}
>
	{#each actions as _, i}
		<Action
			action_data={actions[i]}
			deleteself={() => {
				actions.splice(actions.indexOf(actions[i]), 1);
			}}
		/>
	{/each}
</div>
