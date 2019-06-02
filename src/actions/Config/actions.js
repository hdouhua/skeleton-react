import * as ActionTypes from './constants'

/**
 * @param {string} locale
 */
export const changeLocale = locale => ({ type: ActionTypes.CHANGE_LOCALE, locale })
