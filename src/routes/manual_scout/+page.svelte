<script lang="ts">
	import { ArrowLeft } from 'lucide-svelte';
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
		if (match_key === '' || team_key === '') {
			alert('Please input a match and team key');
			return;
		}
		goto(`/scout/${match_key}-${team_key}-${color}`);
	}
</script>

<div class="flex min-h-dvh flex-col gap-2 p-4 text-xl">
	<a href="/homepage" class="flex w-fit items-center text-lg"><ArrowLeft size={24} />Homepage</a>
	<span class="flex items-center">Match Key</span>
	<input
		class="col-span-2 rounded bg-gunmetal p-4"
		bind:value={match_key}
		type="text"
		placeholder="2024orbb_qm1"
	/>

	<span class="flex items-center">Team Key</span>
	<input
		class="col-span-2 rounded bg-gunmetal p-4"
		bind:value={team_key}
		type="text"
		placeholder="1540"
	/>

	<span class="flex items-center">Color</span>
	<select name="color" bind:value={color} class="col-span-2 block rounded bg-gunmetal p-4">
		<option selected value="">Select a color</option>
		<option value="blue">Blue</option>
		<option value="red">Red</option>
	</select>

	<div class="flex-grow"></div>

	<button class="rounded bg-gunmetal px-4 py-2" onclick={scout}>Scout</button>
</div>
