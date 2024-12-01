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
export type AutoActionsTM = ActionsTM & {
	bunny_intake_success: number;
	bunny_intake_failure: number;
	bunny_internal_success: number;
	bunny_internal_failure: number;
	bunny_external_success: number;
	bunny_external_failure: number;
	bunny_uncontrolled_success: number;
	bunny_uncontrolled_failure: number;
	bunny_low_success: number;
	bunny_low_failure: number;
	actions: AutoActionData[];
};

export type TeleActionsTM = ActionsTM & {
	actions: TeleActionData[];
};

export type ActionsTM = {
	id: number;
	tote_intake_success: number;
	tote_intake_failure: number;
	tote_eject_success: number;
	tote_eject_failure: number;
	balloon_intake_success: number;
	balloon_intake_failure: number;
	balloon_eject_success: number;
	balloon_eject_failure: number;
	score_low_success: number;
	score_low_failure: number;
	score_internal_success: number;
	score_internal_failure: number;
	score_external_success: number;
	score_external_failure: number;
	score_uncontrolled_success: number;
	score_uncontrolled_failure: number;
	bunny_eject_success: number;
	bunny_eject_failure: number;
};

export type TeamMatch = {
	id: number;
	scout_id: string;
	match_key: string;
	team_key: string;
	skill_field_awareness: number;
	skill_quickness: number;
	notes: string;
	broke: boolean;
	died: boolean;
	auto_actions: AutoActionData[];
	tele_actions: TeleActionData[];
};

export type AutoActionData = {
	action: AutoAction;
	success: boolean;
};

export type TeleActionData = {
	action: TeleAction;
	success: boolean;
};

// Action Types
// Naming Convention: action_type + game_piece + where
export type TeleAction =
	| 'IntakeTote'
	| 'IntakeBalloon'
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

// For state machine
export type ItemInputState = 'Intake' | 'Score' | 'Eject' | 'None';
export type TeleInputState = TeleAction | ItemInputState;
export type AutoInputState = TeleInputState | BunnyAction;
