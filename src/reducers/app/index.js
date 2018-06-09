import { get, merge } from 'lodash'
import { actions } from '../../actions/app'
import history from '../../utils/history'

// if the initial url contains '/member/<username>' we reflect this in the initialState
// to show the data for the username already
const memberFromUrl = get(history, 'location.pathname').split('/member/')[1]

const initialState = {
  memberToggle: {
    togglePreferred: typeof memberFromUrl !== 'undefined' || false,
    togglePreferredMember: memberFromUrl || null,
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
