<script lang="ts">
	import { onMount } from 'svelte';

	let controller;
	let promise;
	let team;

	async function err() {
		throw new Error();
	}

	async function reqTeam() {
		controller = new AbortController();
		await fetch('http://127.0.0.1:8080/joinqueue', { signal: controller.signal })
			.then((res) => res.json())
			.then((json) => (team = json.robot));
	}

	onMount(() => {
		promise = err();
	});
</script>

<div>
	{#if typeof window != 'undefined'}
		{#await promise}
			<button style="background-color: Tomato" onclick={() => controller.abort()}
				>Log Out</button
			>
		{:then}
			<h1 style="color: White">Scouting {team}</h1>
		{:catch}
			<button style="background-color: SpringGreen" onclick={() => (promise = reqTeam())}
				>Log In</button
			>
		{/await}
	{/if}
</div>
