import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
// import { connectRouter, routerMiddleware } from 'connected-react-router/immutable'
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'

import reducers from '../reducers'
import rootSaga from '../sagas'

/* eslint-disable no-console,no-unused-vars */
/**
 * logger middleware for redux
 * @param {any} store redux store
 */
const logger = ({ getState }) => next => action => {
  if (action.type === '@@router/LOCATION_CHANGE') {
    return next(action)
  }
  console.group(action.type)
  console.info('%cdispatching', 'color:deepskyblue;font-weight:bold;', action)
  console.time('elapsed')
  let result = next(action)
  console.timeEnd('elapsed')
  console.log('%cnext-state', 'color:limegreen;font-weight:bold;', getState())
  console.groupEnd(action.type)
  return result
}
/**
 * crash reporter middleware for redux
 * @requires module: Raven.js
 * @param {any} store redux store
 */
const crashReporter = ({ getState }) => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    Raven.captureException(err, {
      extra: {
        action,
        state: getState()
      }
    })
    throw err
  }
}
/* eslint-enable no-console,no-unused-vars */

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
    if (typeof Raven !== 'undefined') {
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
