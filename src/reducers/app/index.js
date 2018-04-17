import { get, merge } from 'lodash'
import { actions } from '../../actions/app'

const initialState = {
  memberToggle: {
    togglePreferred: false,
    togglePreferredMember: null,
  },
}

export function reducer(state = initialState, action) {
  const type = get(action, 'type')

  switch (type) {
    case actions.TOGGLE_PREFERRED:
      const togglePreferredMember = get(state, 'memberToggle.togglePreferredMember', false)
      return merge({}, state, {
        memberToggle: {
          togglePreferred: action.toggle,
          togglePreferredMember: action.toggle ? togglePreferredMember : null,
        },
      })
    case actions.TOGGLE_PREFERRED_MEMBER:
      return merge({}, state, {
        memberToggle: {
          togglePreferred: get(action, 'toggle', true),
          togglePreferredMember: action.memberId || null,
        },
      })
    default:
      return state
  }
}
