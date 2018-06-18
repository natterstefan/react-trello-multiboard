import { forEach, map } from 'lodash'
import qs from 'query-string'
import { addNewPatterns } from '../../actions/app'
import { getLists } from '../../data/trello'
import Config from '../../../config/config'
import { regexStringifier } from '../../utils/regex-stringify'
import history from '../../utils/history'

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

  // TODO: optimise and write tests for history.*
  let newRegexSearch = []
  let newRegexHash = []

  if (history.location.search) {
    // eg. url: http://localhost:2222/#/?pattern=#sprint1,#sprint2,#sprint3
    const parsedSearch = qs.parse(history.location.search)
    const parsedPatternSearch = (parsedSearch.pattern && parsedSearch.pattern.split(',')) || []
    newRegexSearch = map(parsedPatternSearch, pattern => new RegExp(pattern))
  }

  if (history.location.hash) {
    // eg. url: http://localhost:2222/#/pattern/#sprint-1,#sprint-2/
    const parsedPatternHash = map(
      history.location.hash.split(',') || [],
      item => item.replace(/^\/|\/$/, ''), // remove / at the end and beginning of the string
    )
    newRegexHash = map(parsedPatternHash, pattern => new RegExp(pattern))
  }

  const regexRules =
    (newRegexSearch.length > 0 && newRegexSearch) ||
    (newRegexHash.length > 0 && newRegexHash) ||
    Config.lists ||
    []

  // if either one of those is correct, we must add it to the redux store as well
  if (regexRules.length > 0) {
    dispatch(addNewPatterns(regexRules))
  }

  try {
    const result = await getLists(board.id) // will get all lists of this board

    const lists = []
    const patterns = []
    forEach(result, list => {
      let pattern = ''
      if (
        // some and rx.test inspired by https://stackoverflow.com/a/38075457/1238150
        regexRules.some(rx => {
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

    dispatch(receiveLists(board.id, lists))
  } catch (errorMsg) {
    dispatch(receiveLists(board.id, null, errorMsg))
  }
}

export { actions, requestLists }
