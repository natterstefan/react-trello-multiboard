import { find, forEach, sortBy } from 'lodash'
import Config from '../../../config/config'
import { getBoard, getMeBoards } from '../../data/trello'

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
    console.log('Config', Config) /* eslint-disable-line */
    console.log('result', result) /* eslint-disable-line */

    const additionalBoards = []
    forEach(Config.boards, (configuredBoard, idx) => {
      // get a board by it's name (works for boards a user subscribed to)
      const nameBoard = find(result, b => b.name === configuredBoard.name)
      const idBoard = find(result, b => b.id === configuredBoard.id)

      if (nameBoard || idBoard) {
        const boardObj = {
          idx,
          board: nameBoard,
          config: configuredBoard,
        }
        boards.push(boardObj)
      } else if (configuredBoard.id && !idBoard) {
        // TODO: write test for this case
        // if the .id is set, but the board was not found we query boards
        // (eg. for public boards, where people are not member of it, which means
        // you would not find it in their me/boards result)
        additionalBoards.push(
          new Promise(resolve => {
            getBoard(configuredBoard.id)
              .then(data => resolve({ configuredBoard, data, idx }))
              .catch(error => resolve({ configuredBoard, error, idx }))
          }),
        )
      }
    })

    const idBoards = await Promise.all(additionalBoards)
    forEach(idBoards, ({ configuredBoard, data, idx }) => {
      const boardObj = {
        idx,
        board: data,
        config: configuredBoard,
      }
      boards.push(boardObj)
    })

    // then update the state once we got all boards
    // TODO: evaluate if board.idx should be removed
    dispatch(receiveBoards(sortBy(boards, ['idx'])))
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
