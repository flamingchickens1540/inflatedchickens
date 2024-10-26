<script lang="ts">
	import { actionResult, actionType, type ActionData } from '$lib/types';
	import Timeline from '$lib/components/Timeline.svelte';

	function addAction() {
		//everything here is for testing, as there is no system for this yet
		latestActions.push({ type: actionType.ScoreAnotherRobotsTote, result: actionResult.success });
		latestActions.push({ type: actionType.EjectTote, result: actionResult.fail });
		latestActions.push({ type: actionType.IntakeTote, result: actionResult.success });
	}

	let latestActions: ActionData[] = $state([]);
</script>

<main class="flex flex-col items-center gap-2 p-2 justify-center h-screen">
    <Timeline bind:actions={latestActions} />

    <!--to be changed in the future-->
    <button class="bg-btn_grey w-80 p-1 rounded border-2 border-outline_gray" onclick={addAction}>Add Action</button>
</main>
