<script lang="ts">
	import { TeamMatch } from '../../lib/types';

	let { match_key, team_key }: { match_key: string; team_key: string } = $props();
	let match: TeamMatch = $state({
		team_key,
		match_key,
		auto_actions: [],
		tele_actions: []
	});
</script>
