import { assign, get } from 'lodash'
import { actions } from '../../actions/cards'
import { actions as boardActions } from '../../actions/boards'

export const initialState = {}

export function reducer(state = initialState, action) {
  const type = get(action, 'type')

  switch (type) {
    case boardActions.RESET_BOARDS:
      return assign({}, initialState)

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
