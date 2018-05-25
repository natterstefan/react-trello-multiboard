import { actions } from '../../../actions/cards'
import { actions as boardActions } from '../../../actions/boards'
import { reducer as app } from '../'

describe('reducers/cards', () => {
  const initialState = {}

  test('returns the correct initial state', () => {
    const testState = app()
    expect(testState).toMatchObject(initialState)
  })

  test('resets state when RESET_BOARDS is triggered', () => {
    const action = { type: boardActions.RESET_BOARDS }
    const result = app({ test: 'someRandomState' }, action)
    expect(result).toEqual(initialState)
  })

  test('changes isLoading to true when REQUEST is triggered', () => {
    const action = { type: actions.REQUEST, listId: 'list-1' }
    const result = app(initialState, action)
    expect(result).toMatchObject({
      'list-1': {
        isLoading: true,
      },
    })
  })

  test('changes isLoading, data and error when RECEIVE is triggered', () => {
    const action = {
      type: actions.RECEIVE,
      listId: 'list-1',
      payload: { randomData: 1 },
      error: null,
    }
    const result = app(initialState, action)
    expect(result).toMatchObject({
      'list-1': {
        isLoading: false,
        data: { randomData: 1 },
        error: null,
      },
    })
  })
})
