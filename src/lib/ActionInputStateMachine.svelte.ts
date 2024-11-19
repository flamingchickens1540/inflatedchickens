import type { AutoAction, AutoActionData, AutoInputState } from '$lib/types';

export class ActionInputStateMachine {
	actionState: AutoInputState = $state('None') as AutoInputState;

	held_bunnies: number = 0;
	held_balloons: number = 0;
	held_totes: number = 0;

	/// Methods for adjusting the state (checked by user)
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
		const action_data: AutoActionData = {
			action: this.actionState as AutoAction,
			success,
			ok: true
		};

		if (this.new_action(action_data)) {
			const ret = this.actionState.slice();
			this.actionState = 'None';
			return ret as AutoAction;
		} else {
			console.error('Illegal action, this is a bug');
			// UB aqfter contract of state machine has been broken
			return {} as unknown as AutoAction;
		}
	}

	// Takes an action and returns if it's a legal one
	public new_action(action_data: AutoActionData): boolean {
		const success = action_data.success;
		const action = action_data.action;
		if (success) {
			if (action.includes('IntakeBalloon')) this.held_balloons++;
			else if (action.includes('IntakeBunny')) this.held_bunnies++;
			else if (action.includes('IntakeTote')) this.held_totes++;
			else if (action.includes('EjectBalloon')) this.held_balloons--;
			else if (action.includes('EjectBunny')) this.held_bunnies--;
			else if (action.includes('EjectTote')) this.held_totes--;
		}
		if (action.includes('ScoreBalloon')) this.held_balloons--;
		else if (action.includes('ScoreBunny')) this.held_bunnies--;

		if (action.includes('Intake')) return true;
		return this.held_balloons >= 0 && this.held_bunnies >= 0 && this.held_totes >= 0;
	}
}
