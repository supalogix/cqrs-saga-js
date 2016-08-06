import { AggregateRoot } from "../src";
import { v4 } from "node-uuid";

const reducer = (state = {}, event) => {
	switch(event.type) {
		case "ACCOUNT_CREATED":
			return {
				aggregateId: event.aggregate_id,
				version: event.version,
				firstName: event.firstName,
				lastName: event.lastName,
				password: event.password,
				email: event.email
			};
		case "PASSWORD_CHANGED":
			return Object.assign({}, state, {
				version: event.version,
				password: event.password
			});
		case "EMAIL_CHANGED":
			return Object.assign({}, state, {
				version: event.version,
				email: event.email
			});
		default:
			return state;
	}
};

const initialState = {};

export default class Account extends AggregateRoot {
	constructor(events, props) {
		super(events, reducer, initialState);

		if(props) {
			const e = Object.assign({}, props, {
				aggregate_id: v4(),
				version: 1,
				type: "ACCOUNT_CREATED",
				version: 1
			});
			
			this.applyChange(e);
		}
	}

	changePassword(password) {
		this.applyChange({
			type: "PASSWORD_CHANGED",
			aggregate_id: this.state.aggregateId,
			version: this.state.version + 1,
			password: password
		});
	}

	changeEmail(email) {
		this.applyChange({
			aggregate_id: this.state.aggregateId,
			version: this.state.version + 1,
			type: "EMAIL_CHANGED",
			email: email
		});
	}
}

