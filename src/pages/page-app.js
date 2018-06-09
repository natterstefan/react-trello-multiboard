import React from 'react'

// Components
import ErrorBoundary from '../components/error-boundary'
import AppContainer from '../components/app-menu-container'
import MainApp from '../components/main-app'

const App = props => (
  <ErrorBoundary>
    <AppContainer>
      <MainApp {...props} />
    </AppContainer>
  </ErrorBoundary>
)
App.displayName = 'App'

export default App
