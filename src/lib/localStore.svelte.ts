import { browser } from '$app/environment';

export class LocalStore<T> {
	value = $state<T[]>() as T[];
	key = '';

	constructor(key: string, value: T[]) {
		this.value = value;
		this.key = key;

		if (browser) {
			const item = localStorage.getItem(key);
			if (item) this.value = this.deserialize(item);
		}

		$effect(() => {
			if (this.value.length > 12) {
				this.value.splice(0, 1);
			}
			localStorage.setItem(this.key, this.serialize(this.value));
		});
	}

	serialize(value: T[]): string {
		return JSON.stringify(value);
	}

	deserialize(item: string): T[] {
		return JSON.parse(item);
	}
}
