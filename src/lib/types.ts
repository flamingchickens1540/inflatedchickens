export type TeamMatch = {
	team_key: string;
	match_key: string;
	auto_actions: AutoActionData[];
	tele_actions: TeleActionData[];
};

export type AutoActionData = {
	action: BunnyActionType | ActionType;
	success: boolean;
};

export type TeleActionData = {
	action: ActionType;
	success: boolean;
};

export enum BunnyActionType {
	IntakeBunny,
	ScoreBunnyTote,
	ScoreBunnyLowZone
}

export enum ActionType {
	IntakeTote,
	IntakeBalloon,
	TakeBalloonFromCoral,

	ScoreYourHeldTote,
	ScoreOtherHeldTote,
	ScoreExternalTote,
	ScoreLowBalloon
}
