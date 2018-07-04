// cpontains sever random little helpers
import { compact, forOwn, get, map, some } from 'lodash'

export const checkState = (obj, prop, lookupProp) => {
  const results = []
  forOwn(get(obj, prop) || {}, value => {
    results.push(value && value[lookupProp])
  })
  return compact(results)
}

// get a list of isLoading states
export const isAppLoading = state => ({
  isBoardsLoading: get(state, 'boards.isLoading') || false,
  isCardsLoading: some(checkState(state, 'cards', 'isLoading'), i => i === true) || false,
  isListsLoading: some(checkState(state, 'lists', 'isLoading'), i => i === true) || false,
  isMembersLoading: get(state, 'members.isLoading') || false,
})

// get a list of errors states (list of errors or empty array when no error exists)
export const getAppErrorsList = state => {
  const getMessage = item => {
    if (!item) {
      return ''
    } else if (item.message) {
      return item.message
    }
    return map(item, i => i.message)
  }

  const errors = {
    boardError: get(state, 'boards.error') || null,
    cardError: checkState(state, 'cards', 'error') || null,
    listError: checkState(state, 'lists', 'error') || null,
    memberError: get(state, 'members.error') || null,
    userError: get(state, 'user.error') || null,
  }
  const appErrors = []
  forOwn(errors, (value, key) => {
    const message = getMessage(value)
    if (message.length === 0) {
      return null
    }

    return value && appErrors.push({ key, message })
  })

  return appErrors
}
