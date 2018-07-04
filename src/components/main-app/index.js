import { connect } from 'react-redux'
import { get, includes } from 'lodash'

// actions
import { push } from 'connected-react-router'
import { authenticateUser } from '../../actions/user'
import { togglePreferred } from '../../actions/app'
import { resetBoards, requestBoards } from '../../actions/boards'
import { loadPreferredMembers } from '../../actions/members'

import MainApp from './component'
import { isAppLoading as isAppLoadingCheck } from '../../utils/utils'

const mapStateToProps = state => {
  // we check if the app is still in a loading state
  const isAppLoading = isAppLoadingCheck(state)

  return {
    app: get(state, 'app', {}),
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
