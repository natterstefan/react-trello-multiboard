import { connect } from 'react-redux'
import { forOwn, get, includes } from 'lodash'

// actions
import { push } from 'connected-react-router'
import { authenticateUser } from '../../actions/user'
import { togglePreferred } from '../../actions/app'
import { resetBoards, requestBoards } from '../../actions/boards'
import { loadPreferredMembers } from '../../actions/members'

import MainApp from './component'

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
    app: get(state, 'app', {}),
    appErrors,
    error: get(state, 'boards.error', null),
    info: get(state, 'info', {}),
    isAppLoading: includes(isAppLoading, true),
    isLoading: get(state, 'boards.isLoading', false),
    isMembersLoading: isAppLoading.isMembersLoading,
    members: get(state, 'members.members', []),
    user: get(state, 'user', {}),
  }
}

const mapDispatchToProps = dispatch => ({
  authorize: () => dispatch(authenticateUser()),
  loadBoards: () => dispatch(requestBoards()),
  reloadBoards: () => {
    dispatch(push('/'))
    dispatch(resetBoards())
  },
  doTogglePreferred: toggle => {
    dispatch(push('/'))
    dispatch(togglePreferred(toggle))
  },
  loadPreferredMembers: () => dispatch(loadPreferredMembers()),
})

const MainAppContainer = connect(mapStateToProps, mapDispatchToProps)(MainApp)
export default MainAppContainer
