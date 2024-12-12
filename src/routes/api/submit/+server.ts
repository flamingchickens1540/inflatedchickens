import type { TeamMatch } from '$lib/types';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { insertTeamMatch, insertUser } from '$lib/server-assets/database';

export const POST: RequestHandler = async ({ request }) => {
	const match: TeamMatch = await request.json();
	return json((await insertTeamMatch(match)) && (await insertUser(match.scout_id)));
};
