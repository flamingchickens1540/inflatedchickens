<script lang="ts">
	import type { ActionData } from '$lib/types';
	import Action from './Action.svelte';

	let { actions = $bindable() }: { actions: ActionData[] } = $props()
	let latestActions: ActionData[] = $derived(actions.toReversed().slice(0, 5))
</script>

<div class="flex flex-col items-center h-[80vh] bg-btn_grey text-text_white p-1 rounded gap-2 w-80">
	{#each latestActions as _, i}
		<Action
			bind:action={latestActions[i]}
			deleteself={() => {
				actions.splice(actions.indexOf(latestActions[i]), 1);
			}}
		/>
	{/each}
</div>
