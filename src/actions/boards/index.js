import { forEach } from 'lodash'
import Config from '../../../config/config'
import { getMeBoards } from '../../data/trello'

const actions = {
  RESET_BOARDS: 'RESET_BOARDS',
  REQUEST: 'REQUEST_BOARDS',
  RECEIVE: 'RECEIVE_BOARDS',
  ADD_BOARD_ESTIMATION: 'ADD_BOARD_ESTIMATION',
}

const startRequestBoards = () => ({ type: actions.REQUEST })

const receiveBoards = (data, error = null) => ({ type: actions.RECEIVE, payload: data, error })

const addBoardEstimations = (boardId, estimations) => ({
  type: actions.ADD_BOARD_ESTIMATION,
  payload: { boardId, estimations },
})

const requestBoards = () => async dispatch => {
  dispatch(startRequestBoards())
  try {
    const result = await getMeBoards()
    const boards = []
    forEach(result, board => {
      forEach(Config.boards, configuredBoard => {
        if (configuredBoard.board === board.name) {
          const boardObj = {
            board,
            config: configuredBoard,
          }
          boards.push(boardObj)
        }
      })
    })

    // then update the state once we got all boards
    dispatch(receiveBoards(boards))
  } catch (e) {
    dispatch(receiveBoards(e, true))
  }
}

const resetAllBoards = () => ({ type: actions.RESET_BOARDS })

const resetBoards = () => dispatch => {
  dispatch(resetAllBoards())
  dispatch(requestBoards())
}

export { actions, addBoardEstimations, requestBoards, receiveBoards, resetBoards }
