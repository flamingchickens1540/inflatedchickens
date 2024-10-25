<script lang="ts">
	import type { ActionData } from './action';

	let { action = $bindable(), deleteself }: { action: ActionData; deleteself: () => void } = $props()

	let actionBackgroundColor = $derived(action.result === 'success' ? '#22ff22' : '#ff2222');
</script>

<button class="action" style="--background-color:{actionBackgroundColor}" onclick={deleteself}>
	{action.type}
</button>

<style>
	button {
		background-color: var(--background-color);
		padding: 2px;
		border-radius: 3px;
		margin-top: 5px;
		margin-bottom: 5px;
		border: none;
		width: 250px;
	}
</style>
