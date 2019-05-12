import React from 'react'
import { t } from '../utils/i18n'

export default function Home() {
  return (
    <div>
      <h1>Hello, world!</h1>
      <p>Welcome to your new single-page application</p>
      <p>{t('greeting', 'xxx', 'React')}</p>
    </div>
  )
}
