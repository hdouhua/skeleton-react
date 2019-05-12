import * as ActionTypes from './constants'

export const requestWeatherForecasts = startDateIndex => ({
  type: ActionTypes.RequestWeatherForecastsType,
  payload: { startDateIndex }
})

export const receiveWeatherForecastsType = (startDateIndex, forecasts) => ({
  type: ActionTypes.ReceiveWeatherForecastsType,
  payload: {
    startDateIndex,
    forecasts
  }
})
