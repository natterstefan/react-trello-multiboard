import { get, merge } from 'lodash'
import { actions } from '../../actions/user'

const initialState = {
  authenticated: false,
  error: null,
  isLoading: false,
}

export function reducer(state = initialState, action) {
  const type = get(action, 'type')

  switch (type) {
    case actions.START_AUTHORIZING:
      return merge({}, state, {
        isLoading: true,
      })
    case actions.DONE_AUTHORIZING:
      return merge({}, state, {
        authenticated: action.success,
        error: action.error,
        isLoading: false,
      })
    default:
      return state
  }
}
