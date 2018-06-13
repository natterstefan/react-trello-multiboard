const actions = {
  RESET_ESTIMATIONS: 'RESET_ESTIMATIONS',
  TOGGLE_PREFERRED: 'TOGGLE_PREFERRED',
  TOGGLE_PREFERRED_MEMBER: 'TOGGLE_PREFERRED_MEMBER',
  TOGGLE_PREFERRED_LIST: 'TOGGLE_PREFERRED_LIST',
}

const togglePreferred = toggle => ({ type: actions.TOGGLE_PREFERRED, toggle })

const togglePreferredMember = memberId => ({ type: actions.TOGGLE_PREFERRED_MEMBER, memberId })

const toggleList = pattern => ({ type: actions.TOGGLE_PREFERRED_LIST, pattern })

const resetEstimations = pattern => ({ type: actions.RESET_ESTIMATIONS, pattern })

export { actions, togglePreferred, resetEstimations, togglePreferredMember, toggleList }
