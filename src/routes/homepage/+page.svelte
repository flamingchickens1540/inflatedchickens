<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	let name: string = (browser && window.localStorage.getItem('name')) || '';
</script>

<div class="flex flex-col items-center justify-evenly h-dvh">
	<h1 class="text-center text-text_red text-5xl font-bold">
		Welcome <br /><span class="text-text_yellow">{name}</span>
	</h1>
	<a
		class="text-center text-text_yellow text-l rounded bg-btn_grey px-4 py-2 border-solid border-2 border-text_red"
		href="/scout"
	>
		Scout
	</a>
</div>
