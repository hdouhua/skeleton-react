import configReducer from './configReducer'
import counterReducer from './counterReducer'
import weatherForecastReducer from './weatherForecastReducer'

/**
 * please add reducer here after you create new reducer
 */
const rootReducer = {
  config: configReducer,
  counter: counterReducer,
  // append more reducers here ...
  demo: weatherForecastReducer
}

export default rootReducer
