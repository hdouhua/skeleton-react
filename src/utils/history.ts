// import { createHashHistory } from 'history'
import { createBrowserHistory } from 'history'

/**
 * a singleton history object
 * Create browser history to use in the Redux store
 */
// const history = createHashHistory({})
const history = createBrowserHistory({})

export default history
