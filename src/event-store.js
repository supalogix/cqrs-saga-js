export default class EventStore {
	saveEvents(aggregateId, events, expectedVersion) {
		throw new Error("Override me");
	}

	getEventsForAggregate( aggregateId ) {
		throw new Error("Override me");
	}
}