import type { TeamMatch } from '$lib/types';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { insertTeamMatch } from '$lib/server-assets/database';

export const POST: RequestHandler = async ({ request }) => {
	const match: TeamMatch = await request.json();
	return json(await insertTeamMatch(match));
};
