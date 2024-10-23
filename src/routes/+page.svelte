<script lang="ts">
	import {ActionData} from "./action"
	import Timeline from './Timeline.svelte';

	let latestActions:ActionData[] = $state([]);
</script>

<Timeline actions={latestActions} />

<style>
	:global(body) {
		background-color: rgb(40, 40, 50);
	}
</style>
