<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	let inputname: string = '';
	onMount(() => {
		let isLoggedIn = browser && window.localStorage.getItem('username');
		if (isLoggedIn) {
			goto('/homepage');
		}
	});
	function login() {
		browser && window.localStorage.setItem('username', inputname);
		goto('/homepage');
	}
</script>

<div class="flex h-dvh flex-col items-center justify-evenly">
	<h1 class="text-text_red text-center text-5xl font-bold">hiiii :3</h1>
	<div>
		<input
			class="bg-btn_grey rounded border-2 border-solid px-4 py-2 text-black"
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
