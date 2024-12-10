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

<div class="flex w-full flex-col gap-2 p-2 accent-yolk_yellow">
	<h1 class="text-center font-heading text-2xl">Post Match</h1>
	<div class="rounded-lg bg-gunmetal p-1">
		<h2 class="font-heading text-xl">Driver Skill</h2>
		<div class="flex w-full flex-wrap items-center justify-center rounded-lg bg-eerie_black">
			<div class="flex flex-col p-2 text-center">
				Quickness: {speed}
				<input class="w-36" type="range" min="0" max="5" step="1" bind:value={speed} />
			</div>
			<div class="flex flex-col p-2 text-center">
				Field awareness: {awareness}
				<input class="w-36" type="range" min="0" max="5" step="1" bind:value={awareness} />
			</div>
		</div>
	</div>
	<div class="rounded-lg bg-gunmetal p-1">
		<h2 class="font-heading text-xl">Robot</h2>
		<div class="flex flex-col gap-1 rounded bg-eerie_black p-2">
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
		><h3 class="font-heading text-xl">Notes</h3>
		<textarea
			class="w-full rounded bg-eerie_black p-1"
			bind:value={notes}
			placeholder="Please add notes"
		></textarea>
	</label>
</div>
