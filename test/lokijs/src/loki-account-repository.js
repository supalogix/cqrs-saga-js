export class LokiAccountRepository extends LokiRepository {
	constructor(eventStore, eventBus) {
		super();
		this.eventStore = eventStore;
		this.eventBus = eventBus;
	}

	getById(id) {
		const events = eventStore.getEventsForAggregate(id);
		const account = new Account();
		account.load(events);
		return account;
	}
}