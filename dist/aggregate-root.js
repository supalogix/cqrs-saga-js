"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _redux = require("redux");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MARK_CHANGES_AS_COMMITTED = "@@cqrs-redux-js/events/MARK_CHANGES_AS_COMMITTED";
var _markChangesAsCommitted = function _markChangesAsCommitted() {
  return {
    type: MARK_CHANGES_AS_COMMITTED
  };
};

var entityChangesReducer = function entityChangesReducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var event = arguments[1];

  if (event.type === '@@redux/INIT') return [];

  if (event.type === MARK_CHANGES_AS_COMMITTED) return [];

  return state.concat(event);
};

var AggregateRoot = function () {
  /**
   * @param {array} events
   * @param {function} entityStateReducer
   * @param {function} initialState
   * @example <caption>Create Subclass</caption>
   * const initialState = {};
   * const reducer = (state, event) => {
   *
   * };
   * class DomainEntity extends AggregateRoot {
   *  constructor(events, props) {
   *    super(events, reducer, initialState);
   *  }
   * }
   */
  function AggregateRoot(events, entityStateReducer, initialState) {
    _classCallCheck(this, AggregateRoot);

    var appState = events.reduce(function (state, event) {
      return entityStateReducer(state, event);
    }, initialState);

    var reducers = {
      entityState: entityStateReducer,
      entityChanges: entityChangesReducer };
    this.store = (0, _redux.createStore)((0, _redux.combineReducers)(reducers), {
      entityState: appState
    });
  }

  /**
   * @return {object}
   */


  _createClass(AggregateRoot, [{
    key: "applyChange",


    /**
     * We need a means of recording changes that happen to an aggregate
     * root.
     *
     * @param {object} event a domain event that you would like to save
     *
     * @example <caption>Add Domain Event to Entity Changes</caption>
     * this.applyChange({
     *   aggregateId: "",
     *   version: 1,
     *   type: ACCOUNT_CREATED
     * })
     */
    value: function applyChange(event) {
      this.store.dispatch(event);
    }

    /**
     * Clients need a means of retrieving the changes that have happened
     * to an aggregate root.
     *
     * @return {array}
     *
     * @example <caption>Publish Domain Events</caption>
     * publisher.publish(entity.getUncommittedChanges())
     *
     */

  }, {
    key: "getUncommittedChanges",
    value: function getUncommittedChanges() {
      return this.store.getState().entityChanges;
    }

    /**
     * An aggregate root needs to let clients clear all its domain events
     * once they have processed the domain events.
     *
     * @example <caption>Clear Domain Events After Publishing</caption>
     * publisher.publish(entity.getUncommittedChanges());
     * entity.markChangesAsCommitted();
     */

  }, {
    key: "markChangesAsCommitted",
    value: function markChangesAsCommitted() {
      this.store.dispatch(_markChangesAsCommitted());
    }
  }, {
    key: "state",
    get: function get() {
      return this.store.getState().entityState;
    }
  }]);

  return AggregateRoot;
}();

exports.default = AggregateRoot;
//# sourceMappingURL=aggregate-root.js.map