import { forEach, uniq } from 'lodash'
import { getLists } from '../../data/trello'
import Config from '../../../config/config'
import { regexStringifier } from '../../utils/regex-stringify'

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
    const result = await getLists(board.id) // will get all lists of this board

    const lists = []
    const patterns = []
    forEach(result, list => {
      let pattern = ''
      if (
        // some and rx.test inspired by https://stackoverflow.com/a/38075457/1238150
        Config.lists.some(rx => {
          if (rx.test(list.name)) {
            pattern = regexStringifier('regex', rx) // convert to string for better re-usage
            patterns.push(pattern)
            return true
          }
          return false
        })
      ) {
        const listObj = {
          list,
          config,
          pattern, // will allow us to only show lists of a certain pattern
        }
        lists.push(listObj)
      }
    })

    console.log('patterns', uniq(patterns)) /* eslint-disable-line */
    console.log('lists', lists) /* eslint-disable-line */
    dispatch(receiveLists(board.id, lists))
  } catch (errorMsg) {
    dispatch(receiveLists(board.id, null, errorMsg))
  }
}

export { actions, requestLists }
