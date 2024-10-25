<script lang="ts">
	import { actionResult, actionType, type ActionData } from './action';
	import Timeline from './Timeline.svelte';
	function thingy() {latestActions.push({type: actionType.EjectTote, result: actionResult.success})}

	let latestActions: ActionData[] = $state([{type: actionType.EjectTote, result: actionResult.fail}]);
	latestActions.push({type: actionType.IntakeTote, result: actionResult.success})
</script>

<Timeline actions={latestActions} />
<button on:click={thingy}>UwU</button>

<style>
	:global(body) {
		background-color: rgb(40, 40, 50);
	}
</style>
