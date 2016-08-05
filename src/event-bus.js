import { EventEmitter } from "events";

export default class EventBus extends EventEmitter {
	publish(events) {
		events.forEach( (event) => {
			this.emit(event.type, event);
		});
	}

	register(eventName, callback) {
		this.on(eventName, callback);
	}
}