<script lang="ts">
	import type { ActionData } from './action';
	import Action from './Action.svelte';

	let { actions }: { actions: ActionData[] } = $props();
</script>

<div id="timeline">
	{#each actions as action}
		<Action {action} />
	{/each}
</div>

<style>
	#timeline {
		width: 20%;
		height: 95vh;
		background-color: rgb(50, 50, 60);
		padding: 10px;
		border-color: white;
		border-width: 5px;
		border-radius: 5px;
	}
</style>
