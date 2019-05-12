import { fromJS } from 'immutable'
import createReducer from './createReducer'
import { ActionTypes } from '../actions/Config'
import { locale } from '../utils/i18n'

const defaultState = fromJS({
  locale: locale
})

const reducer = createReducer(defaultState, {
  [ActionTypes.CHANGE_LOCALE](state, action) {
    return state.set('locale', action.locale)
  }
})

export default reducer
