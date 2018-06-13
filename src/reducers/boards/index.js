import { assign, findIndex, get, map, merge } from 'lodash'
import { actions } from '../../actions/boards'
import { actions as appActions } from '../../actions/app'

export const initialState = {
  data: null, // contains the board objects
  error: null,
  isLoading: false,
}

export function reducer(state = initialState, action) {
  const type = get(action, 'type')
  switch (type) {
    case actions.RESET_BOARDS:
      return initialState

    case appActions.RESET_ESTIMATIONS:
      const newData = map(state.data, board => {
        // if the user had estimations previously, we reset all of them
        const newBoard = board
        if (newBoard.estimations) {
          newBoard.estimations = undefined
        }
        return newBoard
      })

      return merge({}, state, {
        data: newData,
      })

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
        ts: new Date().getTime(),
      })

    case actions.ADD_BOARD_ESTIMATION:
      const { payload } = action
      const { estimations } = payload
      const boardIndex = findIndex(state.data, item => item.board.id === action.payload.boardId)

      if (boardIndex < 0) {
        // eg. the board was not added yet
        return state
      }

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
