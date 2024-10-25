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
}
