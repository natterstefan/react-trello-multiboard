import { push } from 'connected-react-router'
import { actions as appActions } from '../actions/app'

export default store => next => action => {
  switch (action.type) {
    case appActions.TOGGLE_PREFERRED_LIST:
      const { pattern } = action
      if (!pattern) {
        return next(action)
      }

      const path = action.pattern.charAt(0) === '/' ? action.pattern : `/${action.pattern}`
      store.dispatch(push(`/pattern${path}`))
      return next(action)
    default:
      return next(action)
  }
}
