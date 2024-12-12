import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { insertMatch } from '$lib/server-assets/database';

export const POST: RequestHandler = async ({ request }) => {
	const match_key: string = await request.json();
	return json(await insertMatch(match_key));
};
