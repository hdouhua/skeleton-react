import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
// import { connectRouter, routerMiddleware } from 'connected-react-router/immutable'
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'

import reducers from '../reducers'
import rootSaga from '../sagas'

/* eslint-disable no-console,no-unused-vars */
/**
 * logger middleware for redux
 * @param {import('redux').Store} store redux store
 * @type {import('redux-saga').SagaMiddleware}
 */
const logger = ({ getState }) => next => action => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    return next(action)
  }
  console.group(action.type)
  console.debug('%cdispatching', 'color:deepskyblue;font-weight:bold;', action)
  console.time('elapsed')
  let result = next(action)
  let newState = getState()[action.type.split('/')[0]] || getState()
  console.timeEnd('elapsed')
  console.debug('%cnext-state', 'color:limegreen;font-weight:bold;', newState)
  console.groupEnd()
  return result
}
/**
 * crash reporter middleware for redux
 * @requires module: sentry/browser
 * @param {import('redux').Store} store redux store
 * @type {import('redux-saga').SagaMiddleware}
 */
const crashReporter = ({ getState }) => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    Sentry.captureException(err, {
      extra: {
        action,
        state: getState()
      }
    })
    throw err
  }
}
/* eslint-enable no-console,no-unused-vars */

/**
 * create & config redux store
 * @param {import('history').History} history browser history
 * @param {Object} initialState initial state
 */
export default function configureStore(history, initialState) {
  const rootReducer = combineReducers({
    // router: connectRouter(history),
    ...reducers
  })

  const sagaMiddleware = createSagaMiddleware()
  const middlewares = [
    // thunk,
    sagaMiddleware
    // routerMiddleware(history)
  ]

  if (DEV_MODE) {
    middlewares.push(logger)
    if (typeof Sentry !== 'undefined') {
      middlewares.push(crashReporter)
    }
  }

  // In development, use the browser's Redux dev tools extension if installed
  const composeEnhancers =
    DEV_MODE && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
  const enhancer = composeEnhancers(applyMiddleware(...middlewares))

  const store = createStore(rootReducer, initialState, enhancer)

  sagaMiddleware.run(rootSaga)

  return store
}
