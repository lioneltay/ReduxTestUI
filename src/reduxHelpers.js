export function reduxFetchTrio(action) {
  return [action, `${action}_SUCCESS`, `${action}_FAIL`]
}

export function asyncTypes(action) {
  return {
    PENDING: `${action}_PENDING`,
    SUCCESS: `${action}_SUCCESS`,
    FAIL: `${action}_FAIL`,
    ARRAY: [`${action}_PENDING`, `${action}_SUCCESS`, `${action}_FAIL`],
  }
}

export function createReducer(initialState, handlers) {
  return (state = initialState, action) => 
    handlers[action.type]
      ? handlers[action.type](state, action)
      : state
}

export function actionLoggerHandler(state, action) {
  console.log(action)
  return state
}