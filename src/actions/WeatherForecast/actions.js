import * as ActionTypes from './constants'

/**
 * action: request WeatherForecasts
 * @param {number} startDateIndex
 */
export const requestWeatherForecasts = startDateIndex => ({
  type: ActionTypes.RequestWeatherForecastsType,
  payload: { startDateIndex }
})

/**
 * action: receive the request WeatherForecasts
 * @param {number} startDateIndex
 * @param {Array} forecasts
 */
export const receiveWeatherForecasts = (startDateIndex, forecasts) => ({
  type: ActionTypes.ReceiveWeatherForecastsType,
  payload: {
    startDateIndex,
    forecasts
  }
})
