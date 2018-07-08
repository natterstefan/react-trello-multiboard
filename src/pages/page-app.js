import React from 'react'

// Components
import ErrorBoundary from '../components/error-boundary'
import AppContainer from '../components/app-menu-container'
import MainApp from '../components/main-app'
import CookieNotice from '../components/cookie-notice'

const App = props => (
  <ErrorBoundary>
    <CookieNotice />
    <AppContainer>
      <MainApp {...props} />
    </AppContainer>
  </ErrorBoundary>
)
App.displayName = 'App'

export default App
