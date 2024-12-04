<script lang="ts">
	let { complete, cancel }: { complete: (success: boolean) => void; cancel: () => void } =
		$props();
</script>

<div class="fixed inset-0 flex items-center justify-center bg-eerie_black">
	<div
		class="grid h-dvh max-h-[48rem] w-dvw max-w-96 grid-cols-2 grid-rows-4 gap-4 p-4 font-heading text-xl font-extrabold text-white"
	>
		<button
			class="row-span-3 rounded-lg bg-jungle_green shadow-lg shadow-jungle_green/50"
			onclick={() => complete(true)}>Success</button
		>
		<button
			class="row-span-3 rounded-lg bg-flaming_red shadow-lg shadow-flaming_red/50"
			onclick={() => complete(false)}>Fail</button
		>
		<button
			class="col-span-2 rounded-lg bg-gunmetal shadow-lg shadow-gunmetal/50"
			onclick={() => cancel()}>Cancel</button
		>
	</div>
</div>
