// For DB
export type Match = {
	match_key: string;
	event_key: string;
};

export type User = {
	id: string;
	name: string;
	is_admin: boolean;
	slack_token: string;
};

/// Counts
export type ActionsTM = {
	id: number;
	tote_intake_success: number;
	tote_intake_failure: number;
	tote_eject_success: number;
	tote_eject_failure: number;
	balloon_intake_success: number;
	bollon_intake_failure: number;
	score_low_success: number;
	score_low_failure: number;
	score_internal_success: number;
	score_internal_failure: number;
	score_external_success: number;
	score_external_failure: number;
	score_other_robot_success: number;
	score_other_robot_failure: number;
};

export type AutoActionsTM = ActionsTM & {
	bunny_intake_success: number;
	bunny_intake_failure: number;
	bunny_tote_success: number;
	bunny_tote_failure: number;
	bunny_low_success: number;
	bunny_low_failure: number;
	actions: AutoActionData[];
};

export type TeleActionsTM = ActionsTM & {
	actions: TeleActionData[];
};

export type TeamMatch = {
	id: number;
	scout_id: string;
	match_key: string;
	team_key: string;
	skill: number;
	notes: string;
	broke: boolean;
	died: boolean;
	auto_actions: AutoActionData[];
	tele_actions: TeleActionData[];
};

export type TeleActionData = {
	action: TeleAction;
	success: boolean;
	ok: boolean;
};

export type AutoActionData = {
	action: AutoAction;
	success: boolean;
	ok: boolean;
};

// Action Types
// Naming Convention: action_type + game_piece + where
export type TeleAction =
	| 'IntakeTote'
	| 'IntakeBalloon'
	| 'IntakeBalloonCoral'
	| 'ScoreBalloonInternalTote' // Held by scorer
	| 'ScoreBalloonExternalTote' // Held by alliance member
	| 'ScoreBalloonUncontrolledTote'
	| 'ScoreBalloonLow'
	| 'EjectBalloon'
	| 'EjectBunny' // Could happen in Tele; we could instead move this to BunnyAction and reset held_bunnies to 0 after Auto
	| 'EjectTote';

export type BunnyAction =
	| 'IntakeBunny'
	| 'ScoreBunnyInternalTote'
	| 'ScoreBunnyExternalTote'
	| 'ScoreBunnyUncontrolledTote'
	| 'ScoreBunnyLow';
export type AutoAction = TeleAction | BunnyAction;

export type TeleHeldItems = {
	balloons: number;
	totes: number;
};
export type AutoHeldItems = TeleHeldItems & { bunnies: number };

// For state machine
export type ItemInputState = 'Intake' | 'Score' | 'Eject' | 'None';
export type TeleInputState = TeleAction | ItemInputState;
export type AutoInputState = TeleInputState | BunnyAction;
