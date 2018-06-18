import { get } from 'lodash'
import { actions as userActions } from '../actions/user'

export default store => next => action => {
  const state = store.getState()
  const authenticated = get(state, 'user.authenticated')

  // as long as the user is not authenticated, we prevent many
  // actions to be dispatched. One has to explicitly add allowed
  // actions here.
  if (!authenticated) {
    switch (action.type) {
      case 'persist/PERSIST':
      case 'persist/REHYDRATE':
      case userActions.START_AUTHORIZING:
      case userActions.DONE_AUTHORIZING:
        return next(action)
      default:
        return null
    }
  }

  return next(action)
}
