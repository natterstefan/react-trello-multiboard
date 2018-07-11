import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { GITHUB_URL } from '../constants'

import history from '../utils/history'
import Config from '../../config/config'

// Components
import AppPage from '../pages/page-app'
import ConfigPage from '../pages/page-config'
import PrivacyPage from '../pages/page-privacy'

export default () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/config" component={ConfigPage} />
      <Route
        path="/github"
        component={() => {
          // alternative https://stackoverflow.com/a/42988282/1238150
          window.location.href = GITHUB_URL
          return null
        }}
      />
      {Config.google_analytics_property && <Route path="/privacy" component={PrivacyPage} />}
      <Route path="/" component={AppPage} />
    </Switch>
  </ConnectedRouter>
)
