import { assign, get } from 'lodash'
import { actions } from '../../actions/lists'
import { actions as boardActions } from '../../actions/boards'

export const initialState = {}

export function reducer(state = initialState, action) {
  const type = get(action, 'type')
  const boardId = get(action, 'boardId')

  switch (type) {
    case boardActions.RESET_BOARDS:
      return initialState

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
        ts: new Date().getTime(),
      })

    default:
      return state
  }
}
