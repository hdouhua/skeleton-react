import React from 'react'
import { Switch, Route } from 'react-router-dom'
import LoadingIndicator from './components/Common/Loading/Index'

const PageNotFound = React.lazy(() => import('./components/Common/PageNotFound'))
const Home = React.lazy(() => import('./components/Home'))
const Counter = React.lazy(() => import('./components/Counter'))
const CounterHook = React.lazy(() => import('./components/Counter/Hook'))
const FetchData = React.lazy(() => import('./components/FetchData'))

export const RootRouters = () => {
  return (
    <React.Suspense fallback={<LoadingIndicator />}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/counter" component={Counter} />
        <Route path="/counter-hook" render={() => <CounterHook value={1} />} />
        <Route path="/fetch-data/:startDateIndex?" component={FetchData} />
        {/* add more route here */}
        <Route component={PageNotFound} />
      </Switch>
    </React.Suspense>
  )
}
