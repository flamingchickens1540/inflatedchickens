<script lang="ts">
	let {
		quickness = $bindable(),
		awareness = $bindable(),
		broke = $bindable(),
		died = $bindable(),
		notes = $bindable()
	}: {
		quickness: number;
		awareness: number;
		broke: boolean;
		died: boolean;
		notes: string;
	} = $props();
</script>

<div class="flex h-dvh flex-col p-3 align-top">
	<div class="mb-3 flex w-full rounded border-2 border-solid p-4">
		<h1 class="text-3xl">Post Match</h1>
	</div>
	<div class="mb-3 flex w-full content-start rounded border-2 border-solid p-4">
		<label class="w-full text-3xl"
			>Driver Skill
			<div class="flex w-full justify-items-stretch text-base">
				<div class="w-1/2 p-2 text-center">
					Quickness: {quickness}
					<input type="range" min="0" max="5" step="1" bind:value={quickness} />
				</div>
				<div class="w-1/2 p-2 text-center">
					Field awareness: {awareness}
					<input type="range" min="0" max="5" step="1" bind:value={awareness} />
				</div>
			</div>
		</label>
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
