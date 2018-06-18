import { push } from 'connected-react-router'
import { actions as appActions } from '../actions/app'
import { actions as boardActions } from '../actions/boards'

export default store => next => action => {
  switch (action.type) {
    case appActions.TOGGLE_PREFERRED_LIST:
      store.dispatch(push(`/pattern/${encodeURIComponent(action.pattern)}`))
      return next(action)

    case appActions.TOGGLE_PREFERRED:
    case boardActions.RESET_BOARDS:
      store.dispatch(push('/'))
      return next(action)

    default:
      return next(action)
  }
}
