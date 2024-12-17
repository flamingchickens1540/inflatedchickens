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

<div class="grid h-dvh gap-2 p-2">
	<div class="w-full rounded bg-gunmetal p-4 text-center">
		<h1 class="text-3xl font-semibold">Post Match</h1>
	</div>
	<div class="grid w-full rounded bg-gunmetal p-4">
		<label class="w-full text-center text-2xl font-semibold"
			>Driver Skill
			<div class="flex w-full justify-items-stretch text-base">
				<div class="w-1/2 p-2 text-center">
					Response Time
					<input type="range" min="0" max="5" step="1" bind:value={quickness} />
				</div>
				<div class="w-1/2 p-2 text-center">
					Strategy
					<input type="range" min="0" max="5" step="1" bind:value={awareness} />
				</div>
			</div>
		</label>
	</div>
	<div class="grid gap-2 rounded-lg bg-gunmetal p-2">
		<h2 class="text-center text-2xl font-semibold">Condition</h2>
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
	<label class="grid w-full gap-2 rounded-lg bg-gunmetal p-2"
		><h3 class="text-center text-2xl font-semibold">Notes</h3>
		<textarea
			class="min-h-36 w-full rounded bg-eerie_black p-1"
			bind:value={notes}
			placeholder="Please add notes"
		></textarea>
	</label>
</div>
