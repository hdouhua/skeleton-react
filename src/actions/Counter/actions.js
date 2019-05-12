import * as ActionTypes from './constants'

export const increase = () => ({ type: ActionTypes.INCREASE })

export const decrease = () => ({ type: ActionTypes.DECREASE })

export const increaseAsync = () => ({ type: ActionTypes.INCREASE_ASYNC })
