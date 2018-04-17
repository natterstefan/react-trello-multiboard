import { assign, get } from 'lodash'
import { actions } from '../../actions/lists'

export const initialState = {}

export function reducer(state = initialState, action) {
  const type = get(action, 'type')
  const boardId = get(action, 'boardId')

  switch (type) {
    case actions.REQUEST:
      return assign({}, state, {
        [boardId]: {
          isLoading: true,
        },
      })
    case actions.RECEIVE:
      return assign({}, state, {
        [boardId]: {
          isLoading: false,
          data: action.payload,
          error: action.error,
        },
      })
    default:
      return state
  }
}
