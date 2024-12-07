<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	let name: string = (browser && window.localStorage.getItem('name')) || '';
</script>

<div class="flex h-dvh flex-col items-center justify-evenly">
	<h1 class="text-text_white text-center text-5xl font-bold">
		Welcome <br /><span class="text-text_white">{name}</span>
	</h1>
	<a
		class="text-text_white text-l bg-btn_grey border-text_white rounded border-2 border-solid px-4 py-2 text-center"
		href="/scout"
	>
		Scout
	</a>
</div>
