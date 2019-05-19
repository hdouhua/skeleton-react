//eslint-disable-next-line
import { get, post, formPost } from './utils/fetch'

/**
 * Api gallery
 */
const Api = {
  /**
   * get weather forecasts
   * @param {Object} payload
   * @param {number} payload.startDateIndex
   */
  WeatherForecasts: ({ startDateIndex }) => {
    return get(`/api/weather-forecast/${startDateIndex}`)
  }
}

export default Api
