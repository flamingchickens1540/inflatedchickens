<script lang="ts">
	import type { AutoActionData } from '$lib/types';
	import { MoveUp, MoveDown, X } from 'lucide-svelte';

	let {
		action_data = $bindable(),
		index,
		shift,
		remove
	}: {
		action_data: AutoActionData;
		index: number;
		shift: (index: number, change: number) => void;
		remove: (index: number) => void;
	} = $props();

	let color = $derived(
		action_data.success
			? 'bg-jungle_green/50 shadow-jungle_green/10'
			: 'bg-flaming_red/50 shadow-flaming_red/10'
	);
</script>

<!-- <button -->
<!-- 	class="{actionBorderColor} w-full p-1 rounded border-2 text-text_yellow" -->
<!-- 	onclick={deleteself} -->
<!-- > -->
<!-- 	{action.type} -->
<!-- </button> -->

<div
	class="flex flex-row content-center justify-between {color} w-full rounded p-1 text-white shadow-lg"
>
	<span class="w-auto shrink text-clip">{action_data.action}</span>
	<div class="flex shrink-0 flex-row content-center justify-end gap-2">
		<button onclick={() => shift(index, -1)}>
			<MoveUp />
		</button>
		<button onclick={() => shift(index, 1)}>
			<MoveDown />
		</button>
		<button onclick={() => remove(index)}>
			<X />
		</button>
	</div>
</div>
