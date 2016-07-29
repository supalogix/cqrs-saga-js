"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _redux = require("redux");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AggregateRoot = function () {
	function AggregateRoot(reducer) {
		_classCallCheck(this, AggregateRoot);

		this.store = (0, _redux.createStore)(reducer);
		this.events = [];
	}

	_createClass(AggregateRoot, [{
		key: "applyChange",
		value: function applyChange(event) {
			this.store.dispatch(event);
			this.events.push(event);
		}
	}, {
		key: "getUncommittedChanges",
		value: function getUncommittedChanges() {
			return this.events;
		}
	}, {
		key: "markChangesAsCommitted",
		value: function markChangesAsCommitted() {
			this.events = [];
		}
	}, {
		key: "state",
		get: function get() {
			return this.store.getState();
		}
	}]);

	return AggregateRoot;
}();

exports.default = AggregateRoot;
//# sourceMappingURL=aggregate-root.js.map