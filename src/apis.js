//eslint-disable-next-line
import { get, post, formPost } from './utils/fetch'

const Api = {
  WeatherForecasts: ({ startDateIndex }) => {
    return get(`/api/weather-forecast/${startDateIndex}`)
  }
}

export default Api
