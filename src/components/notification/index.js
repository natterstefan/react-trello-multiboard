import { connect } from 'react-redux'
import { get } from 'lodash'
import { getAppErrorsList } from '../../utils/utils'

import Notification from './component'

const mapStateToProps = state => {
  // evaluate if one of the stores has an error and make them (if one occurs)
  // available to the <Component /> so we can tell the user about it
  const appErrors = getAppErrorsList(state)

  return {
    appErrors,
    error: get(state, 'boards.error') || null,
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
    // NOTE: currently we do not differ between any other errors, we just raise
    // the notification/error hint
    customMessage = 'An error occured. Please try it again later.'
  }

  return {
    ...ownProps,
    autoHideDuration,
    message: customMessage || ownProps.message,
  }
}

const NotificationContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Notification)
export default NotificationContainer
