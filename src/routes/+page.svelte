<script lang="ts">
	import { actionResult, actionType, type ActionData } from './action';
	import Timeline from './Timeline.svelte';

	//testing
	function addAction() {
		latestActions.push({ type: actionType.ScoreBalloonAnotherRobotsTote, result: actionResult.success });
	}

	let latestActions: ActionData[] = $state([
		{ type: actionType.EjectTote, result: actionResult.fail }
	]);
	latestActions.push({ type: actionType.IntakeTote, result: actionResult.success });
</script>

<Timeline actions={latestActions} />

<!--testing-->
<button onclick={addAction}>UwU</button>

<style>
	:global(body) {
		background-color: rgb(40, 40, 50);
	}
</style>
