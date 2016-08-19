import { createStore, combineReducers } from "redux";

const MARK_CHANGES_AS_COMMITTED = "@@cqrs-redux-js/events/MARK_CHANGES_AS_COMMITTED";
const markChangesAsCommitted = () => ({
  type: MARK_CHANGES_AS_COMMITTED
})

const entityChangesReducer = (state = [], event) => {
  if( event.type === '@@redux/INIT' )
    return [];

  if( event.type === MARK_CHANGES_AS_COMMITTED )
    return [];

  return state.concat(event);
}

export default class AggregateRoot {
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
  constructor(events, entityStateReducer, initialState) {
    const appState = events.reduce(
      (state,event) => entityStateReducer(state,event),
      initialState);

    const reducers = {
      entityState: entityStateReducer,
      entityChanges: entityChangesReducer };
    this.store = createStore(combineReducers(reducers), {
      entityState: appState
    });
  }

  /**
   * @return {object}
   */
  get state() {
    return this.store.getState().entityState;
  }

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
  applyChange(event) {
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
  getUncommittedChanges() {
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
  markChangesAsCommitted() {
    this.store.dispatch(markChangesAsCommitted());
  }
}
