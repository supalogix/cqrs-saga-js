import {
	Repository,
	AggregateRoot,
	EventStore,
	EventBus
} from "../src"

import Account from "./account";

const account = new Account({
	firstName: "John",
	lastName: "Doe",
	password: "qwerty",
	email: "john.doe@nowhere.com"
});

const events = account.getUncommittedChanges();

console.log("create account");
console.log(events);
console.log(account.state);

console.log("commit changes");
account.markChangesAsCommitted();
console.log(account.getUncommittedChanges());
console.log(account.state);

console.log("change password");
account.changePassword("Qwerty1234");
console.log(account.getUncommittedChanges());
console.log(account.state);

console.log("change email");
account.changeEmail("fake@nowhere.com");
console.log(account.getUncommittedChanges());
console.log(account.state);

class AggregateRoot {
	constructor(events, reducer, initialState) {
		const appState = events.reduce(
			(state,event) => reducer(state,event),
			initialState);
		this.store = createStore(reducer, appState);
	}
}

class Account extends AggregateRoot {
	constructor(events, props) {
		super(events, reducer, initialState);
	}

	getBuilder() {
		return new AccountBuilder();
	}
}

class AccountBuilder {
	build() {
		return new Account([], this);
	}
}
