import { get, map, merge } from 'lodash'
import { actions } from '../../actions/app'
import history from '../../utils/history'
import Config from '../../../config/config'
import { regexStringifier } from '../../utils/regex-stringify'

// if the initial url contains '/member/<username>' we reflect this in the initialState
// to show the data for the username already
const memberFromUrl = get(history, 'location.pathname').split('/member/')[1]

// TODO: compare initial url for current active toggleList
const availablePattern = map(Config.lists, i => regexStringifier('lists', i))

const initialState = {
  config: {
    lists: availablePattern,
  },
  memberToggle: {
    togglePreferred: typeof memberFromUrl !== 'undefined' || false,
    togglePreferredMember: memberFromUrl || null,
  },
  listToggle: {
    toggleList: availablePattern[0] || false,
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
