import { fromJS } from 'immutable'
import createReducer from './createReducer'
import { ActionTypes } from '../actions/WeatherForecast'

const initialState = fromJS({
  startDateIndex: undefined,
  forecasts: []
})

const reducer = createReducer(initialState, {
  [ActionTypes.RequestWeatherForecastsType]: (state, action) => {
    return state.merge({
      startDateIndex: action.startDateIndex,
      isLoading: true
    })
  },
  [ActionTypes.ReceiveWeatherForecastsType]: (state, action) => {
    return state.merge({
      startDateIndex: action.payload.startDateIndex,
      forecasts: action.payload.forecasts,
      isLoading: false
    })
  }
})

export default reducer
