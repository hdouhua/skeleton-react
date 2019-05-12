import React, { useState } from 'react'
import { ActionCreators } from '../../actions/Config'
import { locale as currentLocale, changeLocale } from '../../utils/i18n'

type Props = {
  store?: any
}

export default function LocaleSelector({ store }: Props) {
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

  function onChangeLocale(locale: string) {
    setLocale(locale)
    changeLocale(locale)
    if (store) return store.dispatch(ActionCreators.changeLocale(locale))
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
