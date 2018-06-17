import { actions } from '../../../actions/app'
import { reducer as app } from '../'

describe('reducers/app', () => {
  const initialState = {
    config: { lists: ['/#upcoming/'] },
    listToggle: { toggleList: '/#upcoming/' },
    memberToggle: { togglePreferred: false, togglePreferredMember: null },
  }

  test('returns the correct initial state', () => {
    const testState = app()
    expect(testState).toEqual(initialState)
  })

  test('returns a correct new state when REGISTER_PATTERN is triggered with a pattern array', () => {
    const action = { type: actions.REGISTER_PATTERN, pattern: [/pattern-1/, /pattern-2/] }
    const result = app(initialState, action)
    expect(result).toEqual({
      ...initialState,
      config: { lists: ['/pattern-1/', '/pattern-2/'] },
      listToggle: { toggleList: '/pattern-1/' },
    })
  })

  test('returns a new togglePreferred state when TOGGLE_PREFERRED is triggered with toggle=true', () => {
    const action = { type: actions.TOGGLE_PREFERRED, toggle: true }
    const result = app(initialState, action)
    expect(result).toEqual({
      ...initialState,
      memberToggle: {
        togglePreferred: true,
        togglePreferredMember: null,
      },
    })
  })

  test('sets togglePreferredMember when TOGGLE_PREFERRED_MEMBER is triggered with a member', () => {
    const togglePreferredMember = 'mb1'
    const expectedState = {
      memberToggle: {
        togglePreferred: true,
        togglePreferredMember,
      },
    }

    // dispatch action
    const action = { type: actions.TOGGLE_PREFERRED_MEMBER, memberId: togglePreferredMember }
    const result = app(initialState, action)
    expect(result).toEqual({
      ...initialState,
      ...expectedState,
    })
  })

  test('resets togglePreferredMember when TOGGLE_PREFERRED is triggered with toggle=false', () => {
    // prepare previous state
    const togglePreferredMember = 'mb1'
    const initAction = { type: actions.TOGGLE_PREFERRED_MEMBER, memberId: togglePreferredMember }
    app(initialState, initAction)

    // test new action
    const action = { type: actions.TOGGLE_PREFERRED, toggle: false }
    const result = app(initialState, action)
    expect(result).toEqual({
      ...initialState,
      memberToggle: {
        togglePreferred: false,
        togglePreferredMember: null,
      },
    })
  })

  test('toggles list when TOGGLE_PREFERRED_LIST is triggered', () => {
    const action = { type: actions.TOGGLE_PREFERRED_LIST, pattern: /new-pattern/ }
    const result = app(initialState, action)
    expect(result).toEqual({
      ...initialState,
      listToggle: { toggleList: /new-pattern/ },
    })
  })
})
