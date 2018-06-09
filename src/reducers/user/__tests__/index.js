import { merge } from 'lodash'
import { actions } from '../../../actions/user'
import { reducer as app } from '../'

describe('reducers/user', () => {
  const initialState = {
    authenticated: false,
    error: null,
    isLoading: false,
  }

  test('returns the correct initial state', () => {
    const testState = app()
    expect(testState).toMatchObject(initialState)
  })

  test('changes isLoading when START_AUTHORIZING is triggered', () => {
    const action = { type: actions.START_AUTHORIZING }
    const result = app(initialState, action)
    expect(result).toEqual(
      merge({}, initialState, {
        isLoading: true,
      }),
    )
  })

  test('changes the state properly when DONE_AUTHORIZING is triggered', () => {
    const action = { type: actions.DONE_AUTHORIZING, success: true, error: null }
    const result = app(initialState, action)
    expect(result).toMatchObject({
      authenticated: true,
      error: null,
      isLoading: false,
    })
  })
})
