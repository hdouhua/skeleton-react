import { fromJS } from 'immutable'
import createReducer from './createReducer'
import { ActionTypes } from '../actions/Counter'

const defaultState = fromJS({
  value: 0
})

const reducer = createReducer(defaultState, {
  [ActionTypes.INCREASE]: state => state.set('value', state.get('value') + 1),
  [ActionTypes.DECREASE]: state => state.set('value', state.get('value') - 1)
})

export default reducer
