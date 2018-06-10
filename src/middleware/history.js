import { push } from 'connected-react-router'

export default store => next => action => {
  switch (action.type) {
    case 'TOGGLE_PREFERRED_LIST':
      store.dispatch(push(`/pattern/${encodeURIComponent(action.pattern)}`))
      return next(action)
    default:
      return next(action)
  }
}
