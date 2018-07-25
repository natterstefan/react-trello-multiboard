import React from 'react'
import { cloneDeep, map, reverse } from 'lodash'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'

import Layout from '../layout'
import history from '../utils/history'
import PAGES from '../pages/pages-config'

const RouteComponent = (Component, page) => (
  <Layout page={page} pages={PAGES}>
    <Component />
  </Layout>
)

const renderRoutes = () =>
  map(reverse(cloneDeep(PAGES || [])), page => (
    <Route
      key={page.target}
      path={page.target}
      render={() => RouteComponent(page.component, page)}
    />
  ))

export default () => (
  <ConnectedRouter history={history}>
    <Switch>{renderRoutes()}</Switch>
  </ConnectedRouter>
)
