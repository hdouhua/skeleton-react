import { takeEvery, put, delay } from 'redux-saga/effects'
import { ActionCreators, ActionTypes } from '../actions/Counter'

function* increaseAsync() {
  try {
    yield delay(1000)
    yield put(ActionCreators.increase())
  } catch (err) {
    //eslint-disable-next-line
    console.error(err)
  }
}

export default function* watchIncreaseAsync() {
  yield takeEvery(ActionTypes.INCREASE_ASYNC, increaseAsync)
}
