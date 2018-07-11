/* eslint-disable react/no-danger */
import React from 'react'
import marked from 'marked'

// Content
import Content from '../pages-content/privacy.md'

// Components
import Layout from '../layout'

export const PrivacyContent = () => (
  <span id="privacy" dangerouslySetInnerHTML={{ __html: marked(Content) }} />
)

const PrivacyPage = () => (
  <Layout>
    <PrivacyContent />
  </Layout>
)
PrivacyPage.displayName = 'PrivacyPage'

export default PrivacyPage
