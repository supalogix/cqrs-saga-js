import { createStore } from "redux";

export default class AggregateRoot {
	constructor(reducer) {
		this.store = createStore(reducer);
		this.events = [];
	}
	
	get state() {
		return this.store.getState();
	}

	applyChange(event) {
		this.store.dispatch(event);
		this.events.push(event);
	}

	getUncommittedChanges() {
		return this.events;
	}

	markChangesAsCommitted() {
		this.events = [];
	}
}