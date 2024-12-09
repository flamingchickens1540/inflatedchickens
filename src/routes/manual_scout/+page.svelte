<script lang="ts">
	import { goto } from '$app/navigation';

	let match_key: string = '';
	let team_key: string = '';
	let color: string = '';

	function scout() {
		color = color.toLowerCase();
		if (color !== 'red' && color !== 'blue') {
			alert('Invalid color, please select red or blue');
			return;
		}
		goto(`/scout/${match_key}-${team_key}-${color}`);
	}
</script>

<div class="grid grid-cols-1 grid-rows-4 gap-4 pr-4 pt-4 text-center text-xl">
	<div class="grid grid-cols-3">
		<span class="col-span-1 flex items-center justify-center">Match Key</span>
		<input
			class="col-span-2 rounded p-4 text-black"
			bind:value={match_key}
			type="text"
			placeholder="2024orbb_qm1"
		/>
	</div>

	<div class="grid grid-cols-3">
		<span class="col-span-1 flex items-center justify-center">Team Key</span>
		<input
			class="col-span-2 rounded p-4 text-black"
			bind:value={team_key}
			type="text"
			placeholder="1540"
		/>
	</div>
	<div class="grid grid-cols-3">
		<span class="col-span-1 flex items-center justify-center">Color</span>
		<input
			class="col-span-2 rounded p-4 text-black"
			bind:value={color}
			type="text"
			placeholder="Red"
		/>
	</div>

	<button class="ml-4 rounded border p-4" onclick={scout}>Scout</button>
</div>
