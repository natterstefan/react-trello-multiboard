import React from 'react'
import PropTypes from 'prop-types'
import { invoke } from 'lodash'

class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, errorInfo) {
    // Display fallback UI
    this.setState({ hasError: true, error, errorInfo })
  }

  render() {
    const { hasError, error, errorInfo } = this.state

    if (hasError) {
      // tip: use errorInfo.componentStack in the onError
      invoke(this.props, 'onError', error, errorInfo)

      return (
        <div style={{ margin: 20 }}>
          <h1>Something went wrong.</h1>
          <hr />
          <h3>{error && error.toString()}</h3>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
