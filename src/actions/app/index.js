const actions = {
  TOGGLE_PREFERRED: 'TOGGLE_PREFERRED',
  TOGGLE_PREFERRED_MEMBER: 'TOGGLE_PREFERRED_MEMBER',
}

const togglePreferred = toggle => ({ type: actions.TOGGLE_PREFERRED, toggle })

const togglePreferredMember = memberId => ({ type: actions.TOGGLE_PREFERRED_MEMBER, memberId })

export { actions, togglePreferred, togglePreferredMember }
