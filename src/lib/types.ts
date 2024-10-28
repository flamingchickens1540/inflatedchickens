export type TeamMatch = {
	team_key: string;
	match_key: string;
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
export type BunnyAction = 'IntakeBunny' | 'ScoreBunnyTote' | 'ScoreBunnyLowZone';
export type TeleAction =
	| 'IntakeTote'
	| 'IntakeBalloon'
	| 'TakeBalloonFromCoral'
	| 'ScoreYourHeldTote'
	| 'ScoreOtherHeldTote'
	| 'ScoreExternalTote'
	| 'ScoreLowBalloon';

export type TeleInputState = TeleAction | 'Intake' | 'Score' | 'None';
export type AutoInputState = TeleInputState | BunnyAction;
