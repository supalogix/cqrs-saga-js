import { createStore } from "redux";
import { EventEmitter } from "events";
import { v4 } from "node-uuid";

export class Repository {
	getById(id) {
		throw new Error("Override me");
	}

	save(entity) {
		throw new Error("Override me");
	}
}

export class AggregateRoot {
	constructor(reducer) {
		this.store = createStore(reducer);
		this.events = [];
	}

	applyChange(event) {
		this.store.dispatch(event);
		this.events.push(event);
	}

	getUncommitedChanged() {
		return this.events;
	}

	markChangesAsCommited() {
		this.event = [];
	}
}

export class EventStore {
	saveEvents(aggregateId, events, expectedVersion) {
		throw new Error("Override me");
	}

	getEventsForAggregate( aggregateId ) {
		throw new Error("Override me");
	}
}

export class EventBus extends EventEmitter {
	publish(events) {
		events.forEach( (event) => {
			this.emit(event.type, event);
		});
	}

	register(eventName, callback) {
		this.on(eventName, callback);
	}
}

