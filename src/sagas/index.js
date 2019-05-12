import { all, fork } from 'redux-saga/effects'
import counterSaga from './counterSaga'
import weatherForecastSaga from './weatherForecastSaga'

/**
 * please add your root saga here after you create new saga
 */
export default function* rootSaga() {
  // eslint-disable-next-line redux-saga/no-unhandled-errors
  yield all([
    fork(counterSaga),
    // add more sagas here ...
    fork(weatherForecastSaga)
  ])
}
