<script lang="ts">
	let { complete, cancel }: { complete: (success: boolean) => void; cancel: () => void } = $props();
</script>

<div
	class="bg-zinc-800 text-zinc-50 text-xl font-extrabold fixed inset-0 grid grid-cols-2 grid-rows-3 gap-4 p-4"
>
	<button
		class="rounded-lg row-span-2 shadow-lg shadow-green-600/50 bg-green-600"
		onclick={() => complete(true)}>Success</button
	>
	<button
		class="rounded-lg row-span-2 shadow-lg shadow-red-600/50 bg-red-600"
		onclick={() => complete(false)}>Fail</button
	>
	<button
		class="rounded-lg col-span-2 shadow-lg shadow-zinc-600/50 bg-zinc-600"
		onclick={() => cancel()}>Cancel</button
	>
</div>
