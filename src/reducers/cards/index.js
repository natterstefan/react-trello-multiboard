import { assign, get } from 'lodash'
import { actions } from '../../actions/cards'

export const initialState = {}

export function reducer(state = initialState, action) {
  const type = get(action, 'type')

  switch (type) {
    case actions.REQUEST:
      return assign({}, state, {
        [action.listId]: {
          isLoading: true,
        },
      })
    case actions.RECEIVE:
      const listId = get(action, 'listId')
      return assign({}, state, {
        [listId]: {
          isLoading: false,
          data: action.payload,
          error: action.error,
        },
      })
    default:
      return state
  }
}
