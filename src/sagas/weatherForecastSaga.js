import { takeLatest, put, call, cancelled } from 'redux-saga/effects'
import { ActionCreators, ActionTypes } from '../actions/WeatherForecast'
import Api from '../apis'

function* forecast({ payload: { startDateIndex } }) {
  try {
    let data = yield call(Api.WeatherForecasts, { startDateIndex })
    yield put(ActionCreators.receiveWeatherForecastsType(startDateIndex, data))
  } catch (err) {
    //eslint-disable-next-line
    console.error(err)
    yield cancelled()
  }
}

export default function* rootSaga() {
  yield takeLatest(ActionTypes.RequestWeatherForecastsType, forecast)
}
