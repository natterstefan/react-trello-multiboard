import { actions } from '../../../actions/app'
import { reducer as app } from '../'

describe('reducers/app', () => {
  const initialState = {
    memberToggle: {
      togglePreferred: false,
      togglePreferredMember: null,
    },
  }

  test('returns the correct initial state', () => {
    const testState = app()
    expect(testState).toMatchObject(initialState)
  })

  test('returns a new togglePreferred state when TOGGLE_PREFERRED is triggered with toggle=true', () => {
    const action = { type: actions.TOGGLE_PREFERRED, toggle: true }
    const result = app(initialState, action)
    expect(result).toMatchObject({
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
    expect(result).toMatchObject(expectedState)
  })

  test('resets togglePreferredMember when TOGGLE_PREFERRED is triggered with toggle=false', () => {
    // prepare previous state
    const togglePreferredMember = 'mb1'
    const initAction = { type: actions.TOGGLE_PREFERRED_MEMBER, memberId: togglePreferredMember }
    app(initialState, initAction)

    // test new action
    const action = { type: actions.TOGGLE_PREFERRED, toggle: false }
    const result = app(initialState, action)
    expect(result).toMatchObject({
      memberToggle: {
        togglePreferred: false,
        togglePreferredMember: null,
      },
    })
  })
})
