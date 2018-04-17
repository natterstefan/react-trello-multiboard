import { connect } from 'react-redux'
import { forOwn, get, includes } from 'lodash'

import { authenticateUser } from '../../actions/user'
import { togglePreferred } from '../../actions/app'
import { requestBoards } from '../../actions/boards'
import { loadPreferredMembers } from '../../actions/members'
import MainApp from './component'

const checkLoadingState = (state, type) => {
  forOwn(get(state, type, {}) || {}, value => value && value.isLoading)
}

const mapStateToProps = state => {
  // we check if the app is still in a loading state
  const isAppLoading = {
    isBoardLoading: get(state, 'boards.isLoading', false),
    isCardsLoading: checkLoadingState(state, 'cards'),
    isListsLoading: checkLoadingState(state, 'lists'),
    isMembersLoading: get(state, 'members.isLoading', false),
  }

  return {
    app: get(state, 'app', {}),
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
  doTogglePreferred: toggle => dispatch(togglePreferred(toggle)),
  loadPreferredMembers: () => dispatch(loadPreferredMembers()),
})

const MainAppContainer = connect(mapStateToProps, mapDispatchToProps)(MainApp)
export default MainAppContainer
