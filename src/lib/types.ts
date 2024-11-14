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
	bunny_tote_success: number;
	bunny_tote_failure: number;
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

export type AutoActionData = {
	action: AutoAction;
	success: boolean;
};

export type TeleActionData = {
	action: TeleAction;
	success: boolean;
};

// Action Types
export type TeleAction =
	| 'IntakeTote'
	| 'IntakeBalloon'
	| 'IntakeCoral'
	| 'ScoreYourHeldTote'
	| 'ScoreOtherHeldTote'
	| 'ScoreExternalTote'
	| 'ScoreBalloonLow';

export type BunnyAction = 'IntakeBunny' | 'ScoreBunnyTote' | 'ScoreBunnyLow';
export type AutoAction = TeleAction | BunnyAction;

// For state machine
export type ItemInputState = 'Intake' | 'Score' | 'None';
export type TeleInputState = TeleAction | ItemInputState;
export type AutoInputState = TeleInputState | BunnyAction;
