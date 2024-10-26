<script lang="ts">
	import { actionResult, actionType, type ActionData } from './action';
	import Timeline from '$lib/components/Timeline.svelte';

	function addAction() {
		//everything here is for testing, as there is no system for this yet
		latestActions.push({ type: actionType.ScoreAnotherRobotsTote, result: actionResult.success });
		latestActions.push({ type: actionType.EjectTote, result: actionResult.fail });
		latestActions.push({ type: actionType.IntakeTote, result: actionResult.success });
	}

	let latestActions: ActionData[] = $state([]);
</script>

<Timeline bind:actions={latestActions} />

<!--to be changed in the future-->
<button onclick={addAction}>Add Action</button>

<style>
	:global(body) {
		background-color: rgb(40, 40, 50);
	}
</style>
