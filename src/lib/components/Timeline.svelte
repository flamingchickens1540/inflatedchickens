<script lang="ts">
	import type { ActionData } from '$lib/types';
	import Action from './Action.svelte';

	let { actions = $bindable() }: { actions: ActionData[] } = $props();
	// let latestActions: ActionData[] = $derived(actions.toReversed().slice(0, 5));
</script>

<h1 class="text-text_red">Timeline</h1>
<div
	class="flex flex-col items-center h-full bg-btn_grey border-solid border-2 border-text_red p-2 rounded gap-2 w-full overflow-auto"
>
	{#each actions as _, i}
		<Action
			bind:action={actions[i]}
			deleteself={() => {
				actions.splice(actions.indexOf(actions[i]), 1);
			}}
		/>
	{/each}
</div>
