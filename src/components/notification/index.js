import { connect } from 'react-redux'
import { get } from 'lodash'

import Notification from './component'
import { shouldUpdate } from '../../utils/should-update'

const mapStateToProps = state => ({
  lists: get(state, 'lists', {}),
})

const mapDispatchToProps = dispatch => ({ dispatch })

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const shouldAppUpdate = shouldUpdate(get(stateProps, 'lists.ts'))

  // TODO:
  // - we need to add a periodic check to make this appear, otherwise the components
  // will refresh the data anyway will mounting (see their componentDidMount method)
  return {
    ...ownProps,
    message: shouldAppUpdate
      ? 'You are working with old data. Please reload the page.'
      : ownProps.message,
    action: shouldUpdate
      ? {
          onClick: () => window.location.reload(true),
          text: 'Reload',
        }
      : ownProps.action,
  }
}

const NotificationContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Notification)
export default NotificationContainer
