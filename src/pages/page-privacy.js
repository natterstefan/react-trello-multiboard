/* eslint-disable react/no-danger */
import React from 'react'
import marked from 'marked'

// Content
import Content from '../content/privacy.md'

// Components
import ErrorBoundary from '../components/error-boundary'
import AppContainer from '../components/app-menu-container'
import CookieNotice from '../components/cookie-notice'

export const PrivacyContent = () => (
  <span id="privacy" dangerouslySetInnerHTML={{ __html: marked(Content) }} />
)

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
