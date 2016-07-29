"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Repository = function () {
	function Repository() {
		_classCallCheck(this, Repository);
	}

	_createClass(Repository, [{
		key: "getById",
		value: function getById(id) {
			throw new Error("Override me");
		}
	}, {
		key: "save",
		value: function save(entity) {
			throw new Error("Override me");
		}
	}]);

	return Repository;
}();

exports.default = Repository;
//# sourceMappingURL=repository.js.map