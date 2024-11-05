<script lang="ts">
	import type { ActionData } from '$lib/types';

	let { action = $bindable(), deleteself }: { action: ActionData; deleteself: () => void } =
		$props();

	let actionBorderColor = $derived(
		action.result === 'success' ? 'border-cresc_green' : 'border-fail_red'
	);
	let actionBackgroundColor = $derived(
		action.result === 'success' ? 'bg-cresc_green' : 'bg-fail_red'
	);
</script>

<!-- <button -->
<!-- 	class="{actionBorderColor} w-full p-1 rounded border-2 text-text_yellow" -->
<!-- 	onclick={deleteself} -->
<!-- > -->
<!-- 	{action.type} -->
<!-- </button> -->

<button
	class="{actionBackgroundColor} w-full p-1 rounded border-2 border-outline_gray text-text_white"
	onclick={deleteself}
>
	{action.type}
</button>
