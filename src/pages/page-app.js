import React from 'react'

// Components
import Layout from '../layout'
import MainApp from '../components/main-app'

const AppPage = props => (
  <Layout>
    <MainApp {...props} />
  </Layout>
)
AppPage.displayName = 'AppPage'

export default AppPage
