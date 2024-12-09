<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	let inputname: string = '';

	onMount(() => {
		const isLoggedIn = browser && window.localStorage.getItem('username');
		if (isLoggedIn) {
			goto('/homepage');
		}
	});

	function login() {
		browser && window.localStorage.setItem('username', inputname);
		goto('/homepage');
	}
</script>

<div class="m-4 grid grid-cols-1 place-items-center gap-4">
	<h1 class="text-center text-5xl font-bold">Inflated Chickens :3</h1>
	<div class="mt-16 grid w-9/12 grid-flow-col grid-cols-1 grid-rows-2 gap-4">
		<input
			class="rounded border-2 border-solid px-4 py-2 text-black"
			type="text"
			placeholder="Please enter your name here"
			bind:value={inputname}
		/>
		{#if inputname != ''}
			<button
				class="text-l bg-grey rounded border-2 border-solid px-4 py-2 text-center text-white"
				on:click={login}
			>
				Login
			</button>
		{/if}
	</div>
</div>
