<script lang="ts">
	import { browser } from '$app/environment';
	let username: string = (browser && window.localStorage.getItem('username')) || '';
</script>

<div class="flex h-dvh flex-col items-center justify-evenly">
	<h1 class="text-center text-5xl font-bold">
		Welcome, <br /><span class="text-yellow-400">{username}</span>
	</h1>
	<a
		class="w-9/12 rounded-full border-4 border-solid p-4 pb-16 pt-16 text-center text-2xl"
		href="/queue"
	>
		Scout
	</a>
	<a
		class="w-9/12 rounded-full border-4 border-solid p-4 pb-16 pt-16 text-center text-2xl"
		href="/manual_scout"
	>
		Manual Scout
	</a>
</div>
