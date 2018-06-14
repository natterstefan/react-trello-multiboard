import { assign, get, map, merge } from 'lodash'
import { actions } from '../../actions/app'
import history from '../../utils/history'
import Config from '../../../config/config'
import { regexStringifier } from '../../utils/regex-stringify'

// if the initial url contains '/member/<username>' we reflect this in the initialState
// to show the data for the username already
const memberFromUrl = get(history, 'location.pathname').split('/member/')[1]

// if the initial url contains '/pattern/<toggleList>' we reflect this in the initialState
const patternFromUrl = get(history, 'location.pathname').split('/pattern/')[1] || false
const decodedPatternFromUrl = patternFromUrl ? decodeURIComponent(patternFromUrl) : false
const listConfig = map(Config.lists, i => regexStringifier('lists', i))

const initialState = {
  config: {
    lists: listConfig,
  },
  memberToggle: {
    togglePreferred: typeof memberFromUrl !== 'undefined' || false,
    togglePreferredMember: memberFromUrl || null,
  },
  listToggle: {
    toggleList: decodedPatternFromUrl || listConfig[0] || false,
  },
}

export function reducer(state = initialState, action) {
  const type = get(action, 'type')

  switch (type) {
    case actions.REGISTER_PATTERN:
      const newListConfig = map(action.pattern, i => regexStringifier('lists', i))
      console.log('newListConfig', newListConfig) /* eslint-disable-line */
      return assign({}, state, {
        config: {
          lists: newListConfig,
        },
        listToggle: {
          toggleList: newListConfig[0] || undefined,
        },
      })

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

    case actions.TOGGLE_PREFERRED_LIST:
      return merge({}, state, {
        listToggle: {
          toggleList: get(action, 'pattern') || undefined,
        },
      })

    default:
      return state
  }
}
