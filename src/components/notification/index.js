import { connect } from 'react-redux'
import { forOwn, get } from 'lodash'

import Notification from './component'

const checkState = (state, type, prop) => {
  forOwn(get(state, type, {}) || {}, value => value && value[prop])
}

const mapStateToProps = state => {
  // we check if the app is still in a loading state
  const isAppLoading = {
    isBoardsLoading: get(state, 'boards.isLoading') || undefined,
    isCardsLoading: checkState(state, 'cards', 'isLoading') || undefined,
    isListsLoading: checkState(state, 'lists', 'isLoading') || undefined,
    isMembersLoading: get(state, 'members.isLoading') || undefined,
  }

  // evaluate if one of the stores has an error and make them (if one occurs)
  // available to the <Component /> so we can tell the user about it
  const appErrors = []
  forOwn(
    {
      boardError: get(state, 'boards.error') || undefined,
      cardError: checkState(state, 'cards', 'error') || undefined,
      listError: checkState(state, 'lists', 'error') || undefined,
      memberError: get(state, 'members.error') || undefined,
      userError: get(state, 'user.error') || undefined,
    },
    (item, key) => item && appErrors.push({ key, message: item.message }),
  )

  return {
    appErrors,
    error: get(state, 'boards.error') || undefined,
    isAppLoading,
  }
}

const mapDispatchToProps = () => ({})

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  // if we have an error present, we prepare a message already here
  const { appErrors, error } = stateProps
  let customMessage = null
  let autoHideDuration = 10000
  if (error) {
    if (error.status === 401) {
      if (localStorage) {
        // only when localStorage in the browser is available
        localStorage.removeItem('trello_token')
      }
      customMessage = `${
        error.responseText
      }: Please reload the page and try it again. Optional: delete localStorage as well.`
      autoHideDuration = 60 * 1000 // 1 minute
    }
  } else if (appErrors && appErrors.length > 0) {
    customMessage = 'An error occured. Please try it again later.'
  }

  return {
    ...stateProps,
    ...ownProps,
    autoHideDuration,
    message: customMessage || ownProps.message,
  }
}

const NotificationContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Notification)
export default NotificationContainer
