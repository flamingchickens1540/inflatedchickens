<script lang="ts">
	import type { AutoActionData } from '$lib/types';

	let {
		action_data = $bindable(),
		deleteself
	}: { action_data: AutoActionData; deleteself: () => void } = $props();

	//let actionBorderColor = $derived(action.success ? 'border-cresc_green' : 'border-fail_red');
	let actionBackgroundColor = $derived(
		action_data.success ? 'bg-jungle_green' : 'bg-flaming_red'
	);
</script>

<!-- <button -->
<!-- 	class="{actionBorderColor} w-full p-1 rounded border-2 text-text_yellow" -->
<!-- 	onclick={deleteself} -->
<!-- > -->
<!-- 	{action.type} -->
<!-- </button> -->

<button
	class="{actionBackgroundColor} w-full p-1 rounded border-2 border-outline_gray text-white"
	onclick={deleteself}
>
	{action_data.action}
</button>
