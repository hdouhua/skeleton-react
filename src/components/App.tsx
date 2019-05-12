import React from 'react'
import ErrorBoundary from './Common/ErrorBoundary'
import Layout from './Layout'
import { locale, changeLocale } from '../utils/i18n'

changeLocale(locale)

export default () => (
  <ErrorBoundary>
    <Layout />
  </ErrorBoundary>
)
