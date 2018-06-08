import React from 'react'
import { render } from 'react-dom'
import { Route, Switch } from 'react-router-dom'
import { connectRouter, ConnectedRouter, routerMiddleware } from 'connected-react-router'

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
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import reducers from './reducers'
import history from './utils/history'

// Components
import AppPage from './pages/page-app'
import ConfigPage from './pages/page-config'

// Setup Redux store
const store = createStore(
  connectRouter(history)(reducers),
  composeWithDevTools(applyMiddleware(thunkMiddleware, routerMiddleware(history))),
)

// enable add all brand icons in the entire app
fontawesome.library.add(brands, faAlignLeft, faCheckSquare, faCommentDots, faPaperclip)

export const TrelloMultiboard = () => (
  <Provider store={store}>
    <div>
      <CssBaseline />
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path="/config" component={ConfigPage} />
          <Route path="/" component={AppPage} />
        </Switch>
      </ConnectedRouter>
    </div>
  </Provider>
)
TrelloMultiboard.displayName = 'TrelloMultiboard'

const ROOT_NODE = document.querySelector('#app')
render(<TrelloMultiboard />, ROOT_NODE)
