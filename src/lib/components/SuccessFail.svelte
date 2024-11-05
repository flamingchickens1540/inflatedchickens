<script lang="ts">
	let { complete, cancel }: { complete: (success: boolean) => void; cancel: () => void } = $props();
</script>

<div
	class="bg-zinc-800 text-lg fixed h-screen w-screen grid grid-cols-2 grid-rows-3 auto-cols-max gap-4 p-4"
>
	<button class="rounded-lg row-span-2 bg-green-500" onclick={() => complete(true)}>Success</button>
	<button class="rounded-lg row-span-2 bg-red-500" onclick={() => complete(false)}>Fail</button>
	<button class="rounded-lg col-span-2 bg-zinc-500" onclick={() => cancel()}>Cancel</button>
</div>
