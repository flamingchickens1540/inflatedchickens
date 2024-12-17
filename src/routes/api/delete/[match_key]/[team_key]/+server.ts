import type { RequestHandler } from './$types';
import { delete_team_match } from '$lib/server-assets/database';
import { json } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ params }: any) => {
	return json(((await delete_team_match(params.team_match, params.team_key)) ?? 0) > 0);
};
