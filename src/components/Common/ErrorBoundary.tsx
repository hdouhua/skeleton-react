import React, { Component } from 'react'

interface ErrorState {
  hasError: boolean
  error?: Error
  info?: React.ErrorInfo
}

export default class extends Component<any, ErrorState, any> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false, error: undefined, info: undefined }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // log error to crash report => (error, info)
    /* eslint-disable-next-line */
    console.log('My error on React', error, info)

    this.setState({
      hasError: true,
      error: error,
      info: info
    })
  }

  render() {
    if (this.state.hasError) {
      // render any custom fallback UI here

      return (
        <div style={{ margin: '1em' }}>
          <h2>Something went wrong.</h2>
          <details>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.info && this.state.info.componentStack}
          </details>
        </div>
      )
    }

    return this.props.children
  }
}
