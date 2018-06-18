import React from 'react'
import { render } from 'react-dom'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { PersistGate } from 'redux-persist/integration/react'

// Material UI
import CssBaseline from '@material-ui/core/CssBaseline'

// FontAwesomeIcons
// - add it here, to enable usage in all component
// - see: https://github.com/FortAwesome/react-fontawesome#build-a-library-to-reference-icons-throughout-your-app-more-conveniently
import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import faAlignLeft from '@fortawesome/fontawesome-free-solid/faAlignLeft'
import faCheckSquare from '@fortawesome/fontawesome-free-solid/faCheckSquare'
import faCommentDots from '@fortawesome/fontawesome-free-solid/faCommentDots'
import faPaperclip from '@fortawesome/fontawesome-free-solid/faPaperclip'

// Store and Browser History
import { Provider } from 'react-redux'
import { store, persistor } from './configureStore'
import history from './utils/history'
import { GITHUB_URL } from './constants'

// Components
import AppPage from './pages/page-app'
import ConfigPage from './pages/page-config'

// enable add all brand icons in the entire app
fontawesome.library.add(brands, faAlignLeft, faCheckSquare, faCommentDots, faPaperclip)

export const TrelloMultiboard = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <div>
        <CssBaseline />
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
            <Route path="/" component={AppPage} />
          </Switch>
        </ConnectedRouter>
      </div>
    </PersistGate>
  </Provider>
)
TrelloMultiboard.displayName = 'TrelloMultiboard'

const ROOT_NODE = document.querySelector('#app')
render(<TrelloMultiboard />, ROOT_NODE)
