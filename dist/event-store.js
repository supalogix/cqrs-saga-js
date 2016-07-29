"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventStore = function () {
	function EventStore() {
		_classCallCheck(this, EventStore);
	}

	_createClass(EventStore, [{
		key: "saveEvents",
		value: function saveEvents(aggregateId, events, expectedVersion) {
			throw new Error("Override me");
		}
	}, {
		key: "getEventsForAggregate",
		value: function getEventsForAggregate(aggregateId) {
			throw new Error("Override me");
		}
	}]);

	return EventStore;
}();

exports.default = EventStore;
//# sourceMappingURL=event-store.js.map