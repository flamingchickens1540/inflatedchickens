export enum actionType {
	IntakeTote = 'Intake Tote',
	EjectTote = 'Eject Tote',
	IntakeBalloon = 'Intake Balloon',
	ScoreLow = 'Score Low',
	ScoreExternalTote = 'Score External Tote',
	ScoreInternalTote = 'Score Internal Tote',
	ScoreAnotherRobotsTote = 'Score Another Robots Tote'
}

export enum actionResult {
	success = 'success',
	fail = 'fail'
}

export type ActionData = {
	type: actionType;
	result: actionResult;
};
export type TeamMatch = {
	team_key: string;
	match_key: string;
	scout_id: string;
	skill : number;
	notes : string;
	broke : boolean;
	died : boolean;
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

export type AutoAction = TeleAction | BunnyAction;
export type BunnyAction = 'IntakeBunny' | 'ScoreBunnyTote' | 'ScoreBunnyLow';
export type TeleAction =
	| 'IntakeTote'
	| 'EjectTote'
	| 'IntakeBalloon'
	| 'TakeBalloonFromCoral'
	| 'ScoreYourHeldTote'
	| 'ScoreOtherRobotTote'
	| 'ScoreExternalTote'
	| 'ScoreBalloonLow';
export type ItemInputState = 'Intake' | 'Score' | 'None';
export type TeleInputState = TeleAction | ItemInputState;
export type AutoInputState = TeleInputState | BunnyAction;