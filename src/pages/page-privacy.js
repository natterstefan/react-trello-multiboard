import React from 'react'

// Components
import ErrorBoundary from '../components/error-boundary'
import AppContainer from '../components/app-menu-container'
import CookieNotice from '../components/cookie-notice'

export const PrivacyContent = () => <span id="privacy">Privacy</span>

const PrivacyPage = () => (
  <ErrorBoundary>
    <CookieNotice />
    <AppContainer>
      <PrivacyContent />
    </AppContainer>
  </ErrorBoundary>
)
PrivacyPage.displayName = 'PrivacyPage'

export default PrivacyPage
