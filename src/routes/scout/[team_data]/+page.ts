import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = ({ params }) => {
	const [match_key, team_key, color]: [string, string, 'red' | 'blue'] | undefined =
		params.team_data?.split('-') as [string, string, 'red' | 'blue'];

	// TODO: Check if this does anything
	if (!team_key) return error(400, 'Bad query parameters');
	return {
		match_key: match_key,
		team_key: team_key,
		color: color
	};
};
