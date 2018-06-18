import { push } from 'connected-react-router'
import { actions as appActions } from '../actions/app'

export default store => next => action => {
  switch (action.type) {
    case appActions.TOGGLE_PREFERRED_LIST:
      // NOTE: due to the look of the pattern similar to /pattern/ we do not have to add a / at the beginning
      store.dispatch(push(`/pattern${action.pattern}`))
      return next(action)
    default:
      return next(action)
  }
}
