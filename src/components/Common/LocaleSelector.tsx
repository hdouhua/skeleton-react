import React, { useState } from 'react'
import { connect } from 'react-redux'
import { ActionCreators } from '../../actions/Config'
import { locale as currentLocale, changeLocale } from '../../utils/i18n'

type Props = {
  changeLocaleAction: (locale: string) => {}
}

function LocaleSelector({ changeLocaleAction }: Props) {
  const [locale, setLocale] = useState(currentLocale)
  const locales: Record<string, string> = {
    en: 'English',
    hans: '简体中文',
    hant: '繁體中文'
  }

  // useEffect(() => {
  //   //eslint-disable-next-line
  //   console.log(locale)
  // })

  async function onChangeLocale(locale: string) {
    setLocale(locale)
    // async set locale in i18n
    await changeLocale(locale)
    changeLocaleAction(locale)
  }

  return (
    <select onChange={event => onChangeLocale(event.target.value)} value={locale} className="form-control">
      {Object.keys(locales).map((k: string) => {
        return (
          <option key={k} value={k}>
            {locales[k]}
          </option>
        )
      })}
    </select>
  )
}

export default connect(
  null,
  dispatch => {
    return {
      changeLocaleAction: (locale: string) => dispatch(ActionCreators.changeLocale(locale))
    }
  }
)(LocaleSelector)
