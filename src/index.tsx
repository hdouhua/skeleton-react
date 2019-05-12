import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import history from './utils/history'
// import { ConnectedRouter } from 'connected-react-router/immutable'
import { Router } from 'react-router-dom'
import { register as registerServiceWorker } from './serviceWorker'
import IntlProvider from './components/Common/IntlProvider'
import App from './components/App'

const initialState = {}
const store = configureStore(history, initialState)

render(
  <Provider store={store}>
    <IntlProvider>
      <Router history={history}>
        <App />
      </Router>
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
