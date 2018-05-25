import { assign, findIndex, get, merge } from 'lodash'
import { actions } from '../../actions/boards'

export const initialState = {
  data: null, // contains the board objects
  error: null,
  isLoading: false,
}

export function reducer(state = initialState, action) {
  const type = get(action, 'type')
  switch (type) {
    case actions.RESET_BOARDS:
      return assign({}, initialState)

    case actions.REQUEST:
      return merge({}, state, {
        isLoading: true,
        error: null,
      })

    case actions.RECEIVE:
      return merge({}, state, {
        isLoading: false,
        data: action.payload,
        error: action.error,
      })

    case actions.ADD_BOARD_ESTIMATION:
      const { payload } = action
      const { estimations } = payload
      const boardIndex = findIndex(state.data, item => item.board.id === action.payload.boardId)

      const newState = assign({}, state)
      const estimated =
        get(newState, `data[${boardIndex}]estimations.estimated`, 0) + estimations.estimated
      const consumed =
        get(newState, `data[${boardIndex}]estimations.consumed`, 0) + estimations.consumed

      newState.data[boardIndex] = {
        ...state.data[boardIndex],
        estimations: {
          estimated,
          consumed,
        },
      }
      return newState

    default:
      return state
  }
}
