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

<div class="flex h-dvh flex-col p-3 align-top">
	<div class="mb-3 flex w-full rounded border-2 border-solid p-4">
		<h1 class="text-3xl">Post Match</h1>
	</div>
	<div class="mb-3 flex w-full content-start rounded border-2 border-solid p-4">
		<label class="w-full text-3xl"
			>Driver Skill
			<div class="flex w-full justify-items-stretch text-base">
				<div class="w-1/2 p-2 text-center">
					Quickness: {speed}
					<input type="range" min="0" max="5" step="1" bind:value={speed} />
				</div>
				<div class="w-1/2 p-2 text-center">
					Field awareness: {awareness}
					<input type="range" min="0" max="5" step="1" bind:value={awareness} />
				</div>
			</div>
		</label>
	</div>
	<div class="mb-3 flex w-full content-start rounded border-2 border-solid p-4">
		<label class="w-full text-3xl"
			>Robot
			<div
				class="mb-2 mt-2 flex w-full justify-items-stretch rounded border-2 border-solid text-base"
			>
				<label class="w-1/2 p-2 text-left"
					><input
						type="checkbox"
						name="robotbroke"
						class="mr-2"
						bind:checked={broke}
					/>Broken?</label
				>
			</div>
			<div class="flex w-full justify-items-stretch rounded border-2 border-solid text-base">
				<label class="w-1/2 p-2 text-left"
					><input type="checkbox" name="robotdied" class="mr-2" bind:checked={died} />Died
					on Field?</label
				>
			</div>
		</label>
	</div>
	<div class="mb-3 flex w-full content-start rounded border-2 border-solid p-4">
		<label class="w-full text-3xl"
			>Notes
			<textarea
				class="mt-2 w-full rounded border-2 border-solid p-4 text-base text-black"
				bind:value={notes}
			></textarea>
		</label>
	</div>
</div>
