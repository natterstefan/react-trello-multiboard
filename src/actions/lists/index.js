import { forEach } from 'lodash'
import { getLists } from '../../data/trello'

const actions = {
  REQUEST: 'REQUEST_LIST',
  RECEIVE: 'RECEIVE_LIST',
}

const startRequestList = boardId => ({ type: actions.REQUEST, boardId })

const receiveLists = (boardId, data, error = null) => ({
  type: actions.RECEIVE,
  boardId,
  payload: data,
  error,
})

const requestLists = (board, config) => async dispatch => {
  dispatch(startRequestList(board.id))

  try {
    const result = await getLists(board.id)

    const lists = []
    forEach(result, list => {
      if (list.name.match(config.lists)) {
        const listObj = {
          list,
          config,
        }
        lists.push(listObj)
      }
    })

    dispatch(receiveLists(board.id, lists))
  } catch (errorMsg) {
    dispatch(receiveLists(board.id, null, errorMsg))
  }
}

export { actions, requestLists }
