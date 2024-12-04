import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { select } from '$lib/server-assets/database';

export const GET: RequestHandler = async ( {params} : any ) => {
	return json(await select(params.matchkey, params.teamkey));
};
