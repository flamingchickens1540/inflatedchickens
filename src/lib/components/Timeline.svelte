<script lang="ts">
	import type { ActionData } from '$lib/types';
	import Action from './Action.svelte';

	let { actions = $bindable(), displaying = $bindable()}: { actions: ActionData[], displaying:boolean} = $props();
</script>

<div
class="flex flex-col items-center bg-btn_grey text-text_white p-1 rounded-t-lg transition-transform gap-2 fixed h-[50svh] inset-x-0 bottom-0
{displaying ? "" : "translate-y-full"}"
	id="timeline"
>
<button class="bg-btn_grey w-80 p-1 rounded border-2 border-outline_gray fixed bottom-0" onclick={() => {displaying = false}}> Hide Timeline </button>
	{#each actions as _, i}
		<Action
			bind:action={actions[i]}
			deleteself={() => {
				actions.splice(i, 1);
			}}
		/>
	{/each}
</div>
