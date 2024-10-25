<script lang="ts">
	import type { ActionData } from './action';

	let { action }: { action: ActionData } = $props();

	let actionBackgroundColor = action.result == 'success' ? '#22ff22' : '#ff2222';
</script>

<p class="action" style="--background-color:{actionBackgroundColor}">
	{action.type}
</p>

<style>
	p {
		background-color: var(--background-color);
		padding: 2px;
		border-radius: 3px;
	}
</style>
