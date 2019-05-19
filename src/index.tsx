/* eslint-disable no-console */
import 'bootstrap/dist/css/bootstrap.css'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import history from './utils/history'
// import { ConnectedRouter } from 'connected-react-router/immutable'
import { Router } from 'react-router-dom'
// import { register as registerServiceWorker } from './serviceWorker'
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

/**
 *  log timing of first-paint
 */
const observer = new PerformanceObserver(list => {
  for (const entry of list.getEntries()) {
    const metricName = entry.name
    const time = Math.round(entry.startTime)
    if (metricName === 'first-paint') {
      Sentry.captureMessage(`${metricName}: ${time}`, 'info')
    }
  }
})
observer.observe({ entryTypes: ['paint'] })

/**
 * support issue tracking with sentry
 */
const SentryDsn = SENTRY_DSN
if (typeof SentryDsn !== 'undefined' && SentryDsn.length > 0) {
  Sentry.init({
    dsn: SentryDsn,
    release: '0.1.0',
    environment: 'DEV',
    integrations: new Sentry.Integrations.Breadcrumbs({ console: false })
  })
}

// registerServiceWorker()
