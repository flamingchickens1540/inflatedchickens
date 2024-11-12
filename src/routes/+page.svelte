<script lang="ts">
	import { actionResult, actionType, type ActionData } from './action';
	import Timeline from './Timeline.svelte';

	function addAction() {
		//everything here is for testing, as there is no system for this yet
		latestActions.push({ type: actionType.ScoreAnotherRobotsTote, result: actionResult.success });
		latestActions.push({ type: actionType.EjectTote, result: actionResult.fail });
		latestActions.push({ type: actionType.IntakeTote, result: actionResult.success });
	}

	async function submit() {
		const response = await fetch('/api/submit', {
			method: 'POST',
			body: JSON.stringify(latestActions),
			headers: {
				'content-type': 'application/json'
			}
		});

		console.log(await response.json());
	}

	let latestActions: ActionData[] = $state([]);

	$effect(() => {
		console.log(latestActions);
	});
</script>

<Timeline bind:actions={latestActions} />

<!--to be changed in the future-->
<button onclick={addAction}>Add Action</button>
<button onclick={submit}>Submit</button>

<style>
	:global(body) {
		background-color: rgb(40, 40, 50);
	}
</style>
