import pg from 'pg'
const { Client } = pg
import {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    POSTGRES_DATABASE,
    DB_PORT,
    USE_DB
} from '$env/static/private'
import type { AutoAction, AutoActionData, TeamMatch, TeleAction, TeleActionData } from '$lib/types';

// Whether or not the database is currently being used 
const use_db : boolean = USE_DB === "true";

const db = new Client({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: POSTGRES_DATABASE,
});
await db.connect();

// Returns the number of occurences of the action val with success status success in the auto-actions of match
function countAuto(val : AutoAction, success : boolean, match : TeamMatch): number {
    return match.auto_actions.filter((data) => data.action === val && data.success == success).length;
}

// Returns the number of occurences of the action val with success status success in the tele-actions of match
function countTele(val : TeleAction, success : boolean, match : TeamMatch): number {
    return match.tele_actions.filter((data) => data.action === val && data.success == success).length;
}

type query1 = {action: TeleAction; success: boolean};


export async function insertTeamMatch(match : TeamMatch): Promise<boolean> {
    if (!use_db) return true;

    let {team_key, match_key, scout_id, skill, notes, broke, died, auto_actions, tele_actions} = match;


    try {

        const tele_query = await db.query('INSERT INTO TeleActions VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)',
            (([
                'IntakeTote',
                'EjectTote',
                'IntakeBalloon',
                'ScoreBalloonLow',
                'ScoreYourHeldTote',
                'ScoreExternalTote',
                'ScoreOtherRobotTote'
            ] as TeleAction[])
                .flatMap((val) => [{action : val,success : true}, {action:val, success:false}])
                .map((val) => countTele(val.action, val.success, match)) as (number | TeleActionData[])[])
                .concat([tele_actions])
        );
        const tele_id = tele_query.rows[0];
        
        const auto_query = await db.query('INSERT INTO AutoActions VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)',
            (([
                'IntakeTote',
                'EjectTote',
                'IntakeBalloon',
                'ScoreBalloonLow',
                'ScoreYourHeldTote',
                'ScoreExternalTote',
                'ScoreOtherRobotTote',
                'IntakeBunny',
                'ScoreBunnyTote',
                'ScoreBunnyLow'
            ] as AutoAction[])
                .flatMap((val) => [{action : val,success : true}, {action:val, success:false}])
                .map((val) => countAuto(val.action, val.success, match)) as (number | AutoActionData[])[])
                .concat([auto_actions])
        );
        const auto_id = auto_query.rows[0];

        await db.query('INSERT INTO TeamMatches VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', 
            [
                scout_id,
                match_key,
                team_key,
                skill,
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
};
