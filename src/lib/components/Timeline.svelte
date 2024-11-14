<script lang="ts">
	import type { AutoActionData } from '$lib/types';
	import Action from './Action.svelte';

	let { actions = $bindable() }: { actions: AutoActionData[] } = $props();
	// let latestActions: AutoActionData[] = $derived(actions.toReversed().slice(0, 5));
</script>

{#each actions as _, i}
	<Action
		bind:action={actions[i]}
		deleteself={() => {
			actions.splice(actions.indexOf(actions[i]), 1);
		}}
	/>
{/each}
