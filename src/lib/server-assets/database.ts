import pg from 'pg';
const { Client } = pg;
import {
	DB_HOST,
	DB_USER,
	DB_PASSWORD,
	POSTGRES_DATABASE,
	DB_PORT,
	USE_DB
} from '$env/static/private';
import type {
	ActionsTM,
	AutoAction,
	AutoActionData,
	AutoActionsTM,
	TeamMatch,
	TeleAction,
	TeleActionData,
	TeleActionsTM
} from '$lib/types';

// Whether or not the database is currently being used
const use_db: boolean = USE_DB === 'true';

const db = new Client({
	user: DB_USER,
	password: DB_PASSWORD,
	host: DB_HOST,
	port: DB_PORT,
	database: POSTGRES_DATABASE
});
await db.connect();

// Returns the number of occurences of the action val with success status success in the auto-actions of match
function countAuto(val: AutoAction, success: boolean, match: TeamMatch): number {
	return match.auto_actions.filter((data) => data.action === val && data.success == success)
		.length;
}

// Returns the number of occurences of the action val with success status success in the tele-actions of match
function countTele(val: TeleAction, success: boolean, match: TeamMatch): number {
	return match.tele_actions.filter((data) => data.action === val && data.success == success)
		.length;
}

// Returns the TeleActionsTM object associated to any TeamMatch by counting the occurrences of each TeleAction and then passing along the array of TeleActionDatas.
function matchToTeleActionsTM(match: TeamMatch): TeleActionsTM {
	return {
		id: match.id,
		tote_intake_success: countTele('IntakeTote', true, match),
		tote_intake_failure: countTele('IntakeTote', false, match),
		tote_eject_success: countTele('EjectTote', true, match),
		tote_eject_failure: countTele('EjectTote', false, match),
		balloon_intake_success: countTele('IntakeBalloon', true, match),
		balloon_intake_failure: countTele('IntakeBalloon', false, match),
		balloon_eject_success: countTele('EjectBalloon', true, match),
		balloon_eject_failure: countTele('EjectBalloon', false, match),
		score_low_success: countTele('ScoreBalloonLow', true, match),
		score_low_failure: countTele('ScoreBalloonLow', false, match),
		score_internal_success: countTele('ScoreBalloonInternalTote', true, match),
		score_internal_failure: countTele('ScoreBalloonInternalTote', false, match),
		score_external_success: countTele('ScoreBalloonExternalTote', true, match),
		score_external_failure: countTele('ScoreBalloonExternalTote', false, match),
		score_uncontrolled_success: countTele('ScoreBalloonUncontrolledTote', true, match),
		score_uncontrolled_failure: countTele('ScoreBalloonUncontrolledTote', false, match),
		bunny_eject_success: countTele('EjectBunny', false, match),
		bunny_eject_failure: countTele('EjectBunny', false, match),
		actions: match.tele_actions
	};
}

// Returns the AutoActionsTM object associated to any TeamMatch by counting the occurrences of each AutoAction and then passing along the array of AutoActionDatas.
function matchToAutoActionsTM(match: TeamMatch): AutoActionsTM {
	return {
		id: match.id,
		tote_intake_success: countAuto('IntakeTote', true, match),
		tote_intake_failure: countAuto('IntakeTote', false, match),
		tote_eject_success: countAuto('EjectTote', true, match),
		tote_eject_failure: countAuto('EjectTote', false, match),
		balloon_intake_success: countAuto('IntakeBalloon', true, match),
		balloon_intake_failure: countAuto('IntakeBalloon', false, match),
		balloon_eject_success: countAuto('EjectBalloon', true, match),
		balloon_eject_failure: countAuto('EjectBalloon', false, match),
		score_low_success: countAuto('ScoreBalloonLow', true, match),
		score_low_failure: countAuto('ScoreBalloonLow', false, match),
		score_internal_success: countAuto('ScoreBalloonInternalTote', true, match),
		score_internal_failure: countAuto('ScoreBalloonInternalTote', false, match),
		score_external_success: countAuto('ScoreBalloonExternalTote', true, match),
		score_external_failure: countAuto('ScoreBalloonExternalTote', false, match),
		score_uncontrolled_success: countAuto('ScoreBalloonUncontrolledTote', true, match),
		score_uncontrolled_failure: countAuto('ScoreBalloonUncontrolledTote', false, match),
		bunny_eject_success: countAuto('EjectBunny', false, match),
		bunny_eject_failure: countAuto('EjectBunny', false, match),
		bunny_intake_success: countAuto('IntakeBunny', true, match),
		bunny_intake_failure: countAuto('IntakeBunny', false, match),
		bunny_internal_success: countAuto('ScoreBunnyInternalTote', true, match),
		bunny_internal_failure: countAuto('ScoreBunnyInternalTote', false, match),
		bunny_external_success: countAuto('ScoreBunnyExternalTote', true, match),
		bunny_external_failure: countAuto('ScoreBunnyExternalTote', false, match),
		bunny_uncontrolled_success: countAuto('ScoreBunnyUncontrolledTote', true, match),
		bunny_uncontrolled_failure: countAuto('ScoreBunnyUncontrolledTote', false, match),
		bunny_low_success: countAuto('ScoreBunnyLow', true, match),
		bunny_low_failure: countAuto('ScoreBunnyLow', false, match),
		actions: match.auto_actions
	};
}

export async function insertTeamMatch(match: TeamMatch): Promise<boolean> {
	if (!use_db) return true;

	const teledata = matchToTeleActionsTM(match);
	const autodata = matchToAutoActionsTM(match);
	let {
		scout_id,
		match_key,
		team_key,
		skill_field_awareness,
		skill_quickness,
		notes,
		broke,
		died
	} = match;

	try {
		const tele_query = await db.query(
			'INSERT INTO "TeleActions" VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)',
			[
				teledata.id,
				teledata.tote_intake_success,
				teledata.tote_intake_failure,
				teledata.tote_eject_success,
				teledata.tote_eject_failure,
				teledata.balloon_intake_success,
				teledata.balloon_intake_failure,
				teledata.balloon_eject_success,
				teledata.balloon_eject_failure,
				teledata.score_low_success,
				teledata.score_low_failure,
				teledata.score_internal_success,
				teledata.score_internal_failure,
				teledata.score_external_success,
				teledata.score_external_failure,
				teledata.score_uncontrolled_success,
				teledata.score_uncontrolled_failure,
				teledata.bunny_eject_success,
				teledata.bunny_eject_failure,
				teledata.actions
			]
		);
		const tele_id = tele_query.rows[0];

		const auto_query = await db.query(
			'INSERT INTO "AutoActions" VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30)',
			[
				autodata.id,
				autodata.tote_intake_success,
				autodata.tote_intake_failure,
				autodata.tote_eject_success,
				autodata.tote_eject_failure,
				autodata.balloon_intake_success,
				autodata.balloon_intake_failure,
				autodata.balloon_eject_success,
				autodata.balloon_eject_failure,
				autodata.score_low_success,
				autodata.score_low_failure,
				autodata.score_internal_success,
				autodata.score_internal_failure,
				autodata.score_external_success,
				autodata.score_external_failure,
				autodata.score_uncontrolled_success,
				autodata.score_uncontrolled_failure,
				autodata.bunny_eject_success,
				autodata.bunny_eject_failure,
				autodata.bunny_intake_success,
				autodata.bunny_intake_failure,
				autodata.bunny_internal_success,
				autodata.bunny_internal_failure,
				autodata.bunny_external_success,
				autodata.bunny_external_failure,
				autodata.bunny_uncontrolled_success,
				autodata.bunny_uncontrolled_failure,
				autodata.bunny_low_success,
				autodata.bunny_low_failure,
				autodata.actions
			]
		);
		const auto_id = auto_query.rows[0];

		await db.query(
			'INSERT INTO "TeamMatches" VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
			[
				scout_id,
				match_key,
				team_key,
				skill_field_awareness,
				skill_quickness,
				notes,
				broke,
				died,
				tele_id,
				auto_id
			]
		);

		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}

export async function select(matchkey: string, teamkey: string) {
	return await db.query('SELECT * FROM "TeamMatches" WHERE match_key = $1 AND team_key = $2', [
		matchkey,
		teamkey
	]);
}
