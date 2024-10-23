export enum actionType {
    IntakeTote = 'Intake Tote',
    EjectTote = 'Eject Tote',
    IntakeBalloon = 'Intake Balloon',
    ScoreBalloonLow = 'Score Balloon Low',
    ScoreBalloonExternalTote = 'Score Balloon External Tote',
    ScoreBalloonInternalTote = 'Score Balloon Internal Tote',
    ScoreBalloonAnotherRobotsTote = 'Score Balloon Another Robots Tote'
}

export enum actionResult {
    success = 'success',
    fail = 'fail'
}

export type ActionData = {
    type: actionType;
    result: actionResult;
}