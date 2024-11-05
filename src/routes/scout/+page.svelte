<script lang="ts">
	import type { AutoInputState, TeamMatch, TeleActionData, TeleAction } from '$lib/types';
	import SuccessFail from '$lib/components/SuccessFail.svelte';
	let actionState: AutoInputState = $state('None');

	const intake_piece = () => (actionState = actionState === 'None' ? 'Intake' : actionState);
	const score_piece = () => (actionState = actionState === 'None' ? 'Score' : actionState);
	const score_tote = (type: 'YourHeld' | 'OtherHeld' | 'External') =>
		(actionState = `Score${type}Tote`);
	const score_low = (type: 'Balloon' | 'Bunny') => (actionState = `Score${type}Low`);

	const complete = (success: boolean) => {
		let action: TeleActionData = {
			action: actionState as TeleAction,

			success: success
		};
		actionState = 'None';
	};

	let { match_key, team_key }: { match_key: string; team_key: string } = $props();
	let match: TeamMatch = $state({
		team_key,
		match_key,
		auto_actions: [],
		tele_actions: []
	});
</script>

<main class="text-text_white">
	{#if actionState != 'None'}
		<SuccessFail {complete} cancel={() => (actionState = 'None')} />
	{/if}
	{#if actionState == 'None'}
		<button>oagjoigoadg</button>
	{/if}
	<button class="bg-btn_grey p-2 rounded" onclick={() => score_low('Balloon')}> Score </button>
</main>
