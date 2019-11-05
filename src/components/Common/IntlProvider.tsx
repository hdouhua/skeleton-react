import React from 'react'
import { connect } from 'react-redux'

type Props = {
  locale?: string
  // resource: Object
  children: React.ReactNode
}

//TODO: try to improve by react.context
/**
 * International Provider
 */
class IntlProvider extends React.Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    // if (this.props.locale !== nextProps.locale || !is(this.props.resource, nextProps.resource)) {
    return this.props.locale !== nextProps.locale
  }
  render() {
    return this.props.children
  }
}

export default connect(
  (state: any) => {
    const locale = state.config.get('locale')
    return {
      key: locale,
      locale: locale
      // resource: $$locales.get(locale)
    }
  },
  null
)(IntlProvider)
