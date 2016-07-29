import { AggregateRoot } from "../../../src";

export default class Account extends AggregateRoot {
	constructor(props, state = {}) {
		super(reducer, state);

		if(props) {
			const e = Object.assign({}, props, {
				type: "ACCOUNT_CREATED",
				version: 1
			});
			
			this.applyChange({
				aggregate_id: v4(),
				version: 1,
				type: "ACCOUNT_CREATED",
				email: ""
			});
		}
	}

	changeEmail(email) {
		this.applyChange({
			aggregate_id: this.state.aggregate_id,
			version: this.state.version + 1,
			type: "EMAIL_CHANGED",
			email: email
		});
	}
}