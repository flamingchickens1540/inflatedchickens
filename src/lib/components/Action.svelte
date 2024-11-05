<script lang="ts">
	import type { ActionData } from '$lib/types';

	let { action = $bindable(), deleteself }: { action: ActionData; deleteself: () => void } =
		$props();

	let actionBackgroundColor = $derived(
		action.result === 'success' ? 'bg-cresc_green' : 'bg-fail_red'
	);
</script>

<button
	class="{actionBackgroundColor} w-full p-1 rounded border-2 border-outline_gray text-text_white"
	onclick={deleteself}
>
	{action.type}
</button>
