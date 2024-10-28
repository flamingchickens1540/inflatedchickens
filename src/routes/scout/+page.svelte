<script lang="ts">
	import { ActionType, TeamMatch } from '../../lib/types';
    let action: ActionType | null = null

	const intakeScoreActions = {
		intake: () => 
	};

	let { match_key, team_key }: { match_key: string; team_key: string } = $props();
	let match: TeamMatch = $state({
		team_key,
		match_key,
		auto_actions: [],
		tele_actions: []
	});

</script>

<div>
	{#if input_state == InputState.IntakeScore}
		<button />
	{/if}
	<button />
</div>
