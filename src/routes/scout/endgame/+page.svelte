<script lang="ts">
	import { derived } from 'svelte/store';

	let driverquickness: number;
	let driverfieldawareness: number;
	let broken: boolean;
	let functional: boolean;
	let notes: string;
	function submit() {}
</script>

<div class="accent-text_white flex h-dvh flex-col items-start p-3 align-top">
	<div class="border-text_white bg-btn_grey mb-3 flex w-full rounded border-2 border-solid p-2">
		<h1 class="text-text_white text-3xl">Post Match</h1>
	</div>
	<div
		class="border-text_white bg-btn_grey mb-3 flex w-full content-start rounded border-2 border-solid p-2"
	>
		<label class="text-text_white w-full text-3xl"
			>Driver Skill
			<div class="flex w-full justify-items-stretch text-base">
				<div class="text-text_white w-1/2 p-2 text-center">
					Quickness: {driverquickness}
					<input type="range" min="0" max="5" step="1" bind:value={driverquickness} />
				</div>
				<div class="text-text_white w-1/2 p-2 text-center">
					Field awareness: {driverfieldawareness}
					<input
						type="range"
						min="0"
						max="5"
						step="1"
						bind:value={driverfieldawareness}
					/>
				</div>
			</div>
		</label>
	</div>
	<div
		class="border-text_white bg-btn_grey mb-3 flex w-full content-start rounded border-2 border-solid p-2"
	>
		<label class="text-text_white w-full text-3xl"
			>Robot
			<div
				class="border-text_white mb-2 flex w-full justify-items-stretch rounded border-2 border-solid text-base"
			>
				<label class="text-text_white w-1/2 p-2 text-left"
					><input
						type="radio"
						name="robotbroken"
						class="mr-2"
						value={true}
						bind:group={broken}
					/>Broken</label
				>
				<label class="text-text_white w-1/2 p-2 text-left"
					><input
						type="radio"
						name="robotbroken"
						class="mr-2"
						value={false}
						bind:group={broken}
					/>Undamaged</label
				>
			</div>
			<div
				class="border-text_white flex w-full justify-items-stretch rounded border-2 border-solid text-base"
			>
				<label class="text-text_white w-1/2 p-2 text-left"
					><input
						type="radio"
						name="robotfunctional"
						class="mr-2"
						value={true}
						bind:group={functional}
					/>Functional</label
				>
				<label class="text-text_white w-1/2 p-2 text-left"
					><input
						type="radio"
						name="robotfunctional"
						class="mr-2"
						value={false}
						bind:group={functional}
					/>Died on field</label
				>
			</div>
		</label>
	</div>
	<div
		class="border-text_white bg-btn_grey mb-3 flex w-full content-start rounded border-2 border-solid p-2"
	>
		<label class="text-text_white w-full text-3xl"
			>Notes
			<textarea
				class="border-text_white bg-btn_grey text-text_white w-full rounded border-2 border-solid p-2 text-base"
				bind:value={notes}
			></textarea>
		</label>
	</div>
	<div class="flex w-full">
		<button
			class="border-text_white bg-btn_grey text-text_white m-0 mr-2 w-1/2 rounded border-2 border-solid p-2 text-3xl"
			>←</button
		>
		<button
			on:click={submit}
			class="border-text_white bg-btn_grey text-text_white m-0 w-1/2 rounded border-2 border-solid p-2 text-3xl"
			>Submit</button
		>
	</div>
</div>
