<script lang="ts">
	let { complete, cancel }: { complete: (success: boolean) => void; cancel: () => void } =
		$props();
</script>

<div
	class="bg-eerie_black text-white text-xl font-extrabold fixed inset-0 grid grid-cols-2 grid-rows-4 gap-4 p-4"
>
	<button
		class="rounded-lg row-span-3 shadow-lg shadow-jungle_green/50 bg-jungle_green"
		onclick={() => complete(true)}>Success</button
	>
	<button
		class="rounded-lg row-span-3 shadow-lg shadow-flaming_red/50 bg-flaming_red"
		onclick={() => complete(false)}>Fail</button
	>
	<button
		class="rounded-lg col-span-2 shadow-lg shadow-gunmetal/50 bg-gunmetal"
		onclick={() => cancel()}>Cancel</button
	>
</div>
