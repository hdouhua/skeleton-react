import { takeLatest, put, call, cancelled } from 'redux-saga/effects'
import { ActionCreators, ActionTypes } from '../actions/WeatherForecast'
import Api from '../apis'

/**
 * request WeatherForecasts
 * @typedef {Object} Action - Action type
 * @param {Action} action deconstructing action
 */
function* forecast({ payload: { startDateIndex } }) {
  try {
    let data = yield call(Api.WeatherForecasts, { startDateIndex })
    yield put(ActionCreators.receiveWeatherForecasts(startDateIndex, data))
  } catch (err) {
    //eslint-disable-next-line
    console.error(err)
    yield cancelled()
  }
}

export default function* rootSaga() {
  yield takeLatest(ActionTypes.RequestWeatherForecastsType, forecast)
}
