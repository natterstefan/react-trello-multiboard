import React from 'react'
import PropTypes from 'prop-types'
import ErrorBoundary from '../components/error-boundary'
import AppContainer from '../components/app-menu-container'
import CookieNotice from '../components/cookie-notice'

import Config from '../../config/config'

const Layout = props => (
  <ErrorBoundary>
    {Config.google_analytics_property && <CookieNotice />}
    <AppContainer>{props.children}</AppContainer>
  </ErrorBoundary>
)

Layout.displayName = 'Layout'
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
