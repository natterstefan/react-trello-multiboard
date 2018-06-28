const actions = {
  RESET_ESTIMATIONS: 'RESET_ESTIMATIONS',
  TOGGLE_MINIMIZE_LABELS: 'TOGGLE_MINIMIZE_LABELS',
  TOGGLE_PREFERRED: 'TOGGLE_PREFERRED',
  TOGGLE_PREFERRED_MEMBER: 'TOGGLE_PREFERRED_MEMBER',
  TOGGLE_PREFERRED_LIST: 'TOGGLE_PREFERRED_LIST',
  REGISTER_PATTERN: 'REGISTER_PATTERN',
}

const addNewPatterns = pattern => ({ type: actions.REGISTER_PATTERN, pattern })

const toggleMinimizeLabels = () => ({ type: actions.TOGGLE_MINIMIZE_LABELS })

const togglePreferred = toggle => ({ type: actions.TOGGLE_PREFERRED, toggle })

const togglePreferredMember = memberId => ({ type: actions.TOGGLE_PREFERRED_MEMBER, memberId })

const toggleList = pattern => ({ type: actions.TOGGLE_PREFERRED_LIST, pattern })

const resetEstimations = pattern => ({ type: actions.RESET_ESTIMATIONS, pattern })

export {
  actions,
  addNewPatterns,
  togglePreferred,
  resetEstimations,
  toggleMinimizeLabels,
  togglePreferredMember,
  toggleList,
}
