/* eslint-disable react/no-danger */
import React from 'react'
import marked from 'marked'

// Content
import Content from '../pages-content/privacy.md'

const PrivacyPage = () => (
  <span id="privacy" dangerouslySetInnerHTML={{ __html: marked(Content) }} />
)
PrivacyPage.displayName = 'PrivacyPage'

export default PrivacyPage
