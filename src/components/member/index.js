import { connect } from 'react-redux'
import { get } from 'lodash'
import { togglePreferredMember } from '../../actions/app'

import Member from './component'

const mapStateToProps = state => ({
  members: get(state, 'members', []),
  togglePreferred: get(state, 'app.memberToggle.togglePreferred'),
  togglePreferredMember: get(state, 'app.memberToggle.togglePreferredMember'),
})

const mapDispatchToProps = dispatch => ({ dispatch })

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  // actions
  const memberState = get(stateProps, `members[${ownProps.memberId}]`, {})
  const doTogglePreferredMember = memberId =>
    dispatchProps.dispatch(togglePreferredMember(memberId))

  // prepare the props needed for the UI
  const member = get(memberState, 'data', {})
  const estimations = get(memberState, 'estimations', {})
  const isLoading = get(memberState, 'isLoading', false)
  const error = get(memberState, 'error')

  // UI details
  const isActive = stateProps.togglePreferred && stateProps.togglePreferredMember === member.id

  return {
    doTogglePreferredMember,
    error,
    estimations,
    isActive,
    isLoading,
    member,
  }
}

const MemberContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Member)
export default MemberContainer
