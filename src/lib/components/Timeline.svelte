<script lang="ts">
	import type { ActionData } from '$lib/types';
	import Action from './Action.svelte';

	let { actions = $bindable(), height}: { actions: ActionData[], height:number} = $props();

</script>

<div
	class="flex flex-col items-center h-[{height}px] bg-btn_grey text-text_white p-1 rounded gap-2 w-80 border-2 border-outline_gray"
	id="timeline"
>
	{#each actions as _, i}
		<Action
			bind:action={actions[i]}
			deleteself={() => {
				actions.splice(i, 1);
			}}
		/>
	{/each}
</div>
