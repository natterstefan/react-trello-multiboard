import { connect } from 'react-redux'
import { get } from 'lodash'

// acions
import { push } from 'connected-react-router'
import { togglePreferredMember as togglePreferredMemberAction } from '../../actions/app'

import Member from './component'
import { getMemberByOneOfProperty } from '../../utils/get-member-by-property'

const mapStateToProps = state => ({
  members: get(state, 'members', []),
  togglePreferred: get(state, 'app.memberToggle.togglePreferred'),
  togglePreferredMember: get(state, 'app.memberToggle.togglePreferredMember'),
})

const mapDispatchToProps = dispatch => ({ dispatch })

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { togglePreferred, togglePreferredMember } = stateProps

  // actions
  const memberState = get(stateProps, `members[${ownProps.memberId}]`, {})
  const onClick = () => {
    dispatchProps.dispatch(push(`/member/${memberState.data.username}`))
    dispatchProps.dispatch(togglePreferredMemberAction(ownProps.memberId))
  }

  // prepare the props needed for the UI
  const member = get(memberState, 'data', {})
  const estimations = get(memberState, 'estimations', {})
  const isLoading = get(memberState, 'isLoading', false)
  const error = get(memberState, 'error')

  // UI details like the active state (from the css perspective)
  const hasMember =
    typeof getMemberByOneOfProperty(
      [memberState.data],
      ['id', 'username'],
      togglePreferredMember,
    ) !== 'undefined'
  const isActive = togglePreferred && hasMember

  return {
    error,
    estimations,
    isActive,
    isLoading,
    member,
    onClick,
  }
}

const MemberContainer = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Member)
export default MemberContainer
