<script lang="ts">
	import { TeleInputState, TeamMatch, TeleActionData, TeleAction } from '../../lib/types';
	let state: TeleInputState = $state('None');

	const intake_piece = () => (state = state === 'None' ? 'Intake' : state);
	const score_piece = () => (state = state === 'None' ? 'Score' : state);
	const score_tote = (type: 'YourHeld' | 'OtherHeld' | 'External') => (state = `Score${type}Tote`);
	const score_low = (type: 'Balloon' | 'Bunny') => (state = `Score${type}Low`);

	const complete = (success: boolean) => {
		let action: TeleActionData = {
			action: state as TeleAction,

			success: success
		};
		state = 'None';
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
