"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require("events");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventBus = function (_EventEmitter) {
	_inherits(EventBus, _EventEmitter);

	function EventBus() {
		_classCallCheck(this, EventBus);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(EventBus).apply(this, arguments));
	}

	_createClass(EventBus, [{
		key: "publish",
		value: function publish(events) {
			var _this2 = this;

			events.forEach(function (event) {
				_this2.emit(event.type, event);
			});
		}
	}, {
		key: "register",
		value: function register(eventName, callback) {
			this.on(eventName, callback);
		}
	}]);

	return EventBus;
}(_events.EventEmitter);

exports.default = EventBus;
//# sourceMappingURL=event-bus.js.map