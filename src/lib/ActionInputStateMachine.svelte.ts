import type { AutoActionData } from '$lib/types';

export class ActionInputVerifier {
	private held_bunnies: number = 0;
	private held_balloons: number = 0;
	private held_totes: number = 0;

	public get_held_tele(): { balloons: number; totes: number } {
		return {
			balloons: this.held_balloons,
			totes: this.held_totes
		};
	}
	public get_held_auto(): { bunnies: number; balloons: number; totes: number } {
		return {
			bunnies: this.held_bunnies,
			balloons: this.held_balloons,
			totes: this.held_totes
		};
	}

	public actions_are_ok(action_data: AutoActionData[]): boolean {
		return action_data.every((action) => action.ok);
	}

	public verify_actions(action_data: AutoActionData[]) {
		action_data.forEach((action) => {
			action.ok = this.verify_new_action(action);
			this.held_totes = Math.max(this.held_totes, 0);
			this.held_balloons = Math.max(this.held_balloons, 0);
			this.held_bunnies = Math.max(this.held_bunnies, 0);
		});
	}

	// Takes an action and returns if it's a legal one
	verify_new_action(action_data: AutoActionData): boolean {
		const success = action_data.success;
		const action = action_data.action;
		if (action.includes('InternalTote') && this.held_totes === 0) return false;
		if (success) {
			if (action.includes('IntakeBalloon')) this.held_balloons++;
			else if (action.includes('IntakeBunny')) this.held_bunnies++;
			else if (action.includes('IntakeTote')) this.held_totes++;
			else if (action.includes('PreloadBunny')) this.held_bunnies++;
			else if (action.includes('PreloadBalloon')) this.held_balloons++;
			else if (action.includes('EjectBalloon')) this.held_balloons--;
			else if (action.includes('EjectBunny')) this.held_bunnies--;
			else if (action.includes('EjectTote')) this.held_totes--;
		} else {
			if (action.includes('EjectBunny') && this.held_bunnies === 0) return false;
			else if (action.includes('EjectBalloon') && this.held_balloons === 0) return false;
			else if (action.includes('EjectTote') && this.held_totes === 0) return false;
		}
		if (action.includes('ScoreBalloon')) this.held_balloons--;
		else if (action.includes('ScoreBunny')) this.held_bunnies--;

		if (action.includes('Intake')) return true;
		return this.held_balloons >= 0 && this.held_bunnies >= 0 && this.held_totes >= 0;
	}
}
