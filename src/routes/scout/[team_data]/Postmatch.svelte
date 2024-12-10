<script lang="ts">
	let {
		speed = $bindable(),
		awareness = $bindable(),
		broke = $bindable(),
		died = $bindable(),
		notes = $bindable()
	}: {
		speed: number;
		awareness: number;
		broke: boolean;
		died: boolean;
		notes: string;
	} = $props();
</script>

<div class="flex w-full flex-col gap-2 accent-yolk_yellow">
	<h1 class="text-center font-heading text-2xl">Post Match</h1>
	<div class="rounded-lg bg-gunmetal p-1">
		<h2 class="mb-1 font-heading text-2xl">Driver Skill</h2>
		<div
			class="flex w-full flex-wrap items-center justify-center rounded-lg bg-eerie_black text-lg"
		>
			<div class="flex flex-col p-1 text-center">
				Quickness: {speed}
				<input class="w-36" type="range" min="0" max="5" step="1" bind:value={speed} />
			</div>
			<div class="flex flex-col p-1 text-center">
				Field awareness: {awareness}
				<input class="w-36" type="range" min="0" max="5" step="1" bind:value={awareness} />
			</div>
		</div>
	</div>
	<div class="rounded-lg bg-gunmetal p-1">
		<h2 class="mb-1 font-heading text-2xl">Robot</h2>
		<div class="flex flex-col gap-2 rounded bg-eerie_black p-2">
			<label
				><input type="checkbox" name="robotbroke" bind:checked={broke} /><span class="px-1"
					>Broken?</span
				></label
			>
			<label
				><input type="checkbox" name="robotdied" bind:checked={died} /><span class="px-1"
					>Died on Field?</span
				></label
			>
		</div>
	</div>
	<label class="w-full rounded-lg bg-gunmetal p-1"
		><h3 class="mb-1 font-heading text-2xl">Notes</h3>
		<textarea
			class="min-h-36 w-full rounded bg-eerie_black p-1"
			bind:value={notes}
			placeholder="Please add notes"
		></textarea>
	</label>
</div>
