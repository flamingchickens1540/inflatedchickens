<script lang="ts">
	import type { ActionData } from '$lib/types';
	import Action from './Action.svelte';

	let { actions = $bindable() }: { actions: ActionData[] } = $props()
</script>

<div id="timeline">
	{#each actions as _, i}
		<Action
			bind:action={actions[i]}
			deleteself={() => {
				actions.splice(i, 1);
			}}
		/>
	{/each}
</div>

<style>
	#timeline {
		width: 250px;
		height: 95vh;
		background-color: rgb(50, 50, 60);
		padding: 10px;
		border-color: white;
		border-width: 5px;
		border-radius: 5px;
	}
</style>
