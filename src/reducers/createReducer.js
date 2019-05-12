/**
 * a helper to generate reducer
 * @param {JSON} initialState the default state
 * @param {function} handlers a specific handler for a specific ActionType
 */
export default function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}
