import type { AutoAction, AutoInputState } from '$lib/types';

export class ActionInputStateMachine {
	actionState: AutoInputState = $state('None') as AutoInputState;

	held_bunnies: number = 0;
	held_balloons: number = $state(0);
	held_totes: number = $state(0);
	held_scorables: number = $derived(this.held_balloons + this.held_bunnies);
	held_ejectables: number = $derived(this.held_scorables + this.held_totes);

	intake_piece() {
		this.actionState = this.actionState === 'None' ? 'Intake' : this.actionState;
	}
	score_piece() {
		this.actionState = this.actionState === 'None' ? 'Score' : this.actionState;
	}
	eject_piece() {
		this.actionState = this.actionState === 'None' ? 'Eject' : this.actionState;
	}

	score_bunny(where: 'Low' | 'ExternalTote' | 'InternalTote' | 'UncontrolledTote') {
		this.actionState = `ScoreBunny${where}`;
	}
	score_balloon(where: 'Low' | 'InternalTote' | 'ExternalTote' | 'UncontrolledTote') {
		this.actionState = `ScoreBalloon${where}`;
	}

	complete_action(success: boolean): AutoAction {
		if (success) {
			if (this.actionState.includes('IntakeBalloon')) this.held_balloons++;
			else if (this.actionState.includes('IntakeBunny')) this.held_bunnies++;
			else if (this.actionState.includes('IntakeTote')) this.held_totes++;
			else if (this.actionState.includes('EjectBalloon')) this.held_balloons--;
			else if (this.actionState.includes('EjectBunny')) this.held_bunnies--;
			else if (this.actionState.includes('EjectTote')) this.held_totes--;
		}
		// Assume failed scoring is still ejecting
		if (this.actionState.includes('ScoreBalloon')) this.held_balloons--;
		else if (this.actionState.includes('ScoreBunny')) this.held_bunnies--;

		const ret = this.actionState.slice();
		this.actionState = 'None';
		return ret as AutoAction;
	}
}
