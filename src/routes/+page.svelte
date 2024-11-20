<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	let name: string = (browser && window.localStorage.getItem('name')) || '';
	let inputname: string;
	onMount(() => {
		let isLoggedIn = browser != null && window.localStorage.getItem('name') != '';
		if (isLoggedIn) {
			goto('/homepage');
		}
	});
	function login() {
		if (inputname === '') {
			alert('Enter your name');
		} else {
			browser && window.localStorage.setItem('name', inputname);
			name = inputname;
			goto('/homepage');
		}
	}
</script>

<div class="flex h-dvh flex-col items-center justify-evenly">
	<h1 class="text-text_red text-center text-5xl font-bold">hiiii :3</h1>
	<div>
		<input
			class="bg-btn_grey border-text_red text-text_yellow rounded border-2 border-solid px-4 py-2"
			type="text"
			placeholder="Enter your name here"
			bind:value={inputname}
		/>
		<button
			class="text-text_yellow text-l bg-btn_grey border-text_red rounded border-2 border-solid px-4 py-2 text-center"
			on:click={login}
		>
			Login
		</button>
	</div>
</div>
