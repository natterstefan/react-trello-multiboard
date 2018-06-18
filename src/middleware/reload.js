import { actions as boardActions } from '../actions/boards'
import { resetEstimations } from '../actions/app'

export default store => next => action => {
  // every time a the app requests allBoards (which is basically a reset/reload)
  // we reset all estimations
  if (action.type === boardActions.REQUEST) {
    store.dispatch(resetEstimations())
    return next(action)
  }

  return next(action)
}
