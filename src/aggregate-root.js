import { createStore } from "redux";

const MARK_CHANGES_AS_COMMITTED = "cqrs-redux-js/events/MARK_CHANGES_AS_COMMITTED";

const entityChangesReducer = (state = [], event) {
	if( event.type === MARK_CHANGES_AS_COMMITTED )
		return [];

	return state.concat(event);
}

export default class AggregateRoot {
	constructor(events, entityStateReducer, initialState) {
		const appState = events.reduce(
			(state,event) => entityStateReducer(state,event),
			initialState);

		const reducer = {
			entityState: entityStateReducer,
			entityChanges: entityChangesReducer };
		this.store = createStore(reducer, appState);
	}
	
	get state() {
		return this.store.getState().entityState;
	}

	applyChange(event) {
		this.store.dispatch(event);
	}

	getUncommittedChanges() {
		return this.store.getState().entityChanges;
	}

	markChangesAsCommitted() {
		this.store.dispatch(MARK_CHANGES_AS_COMMITTED);
	}
}
