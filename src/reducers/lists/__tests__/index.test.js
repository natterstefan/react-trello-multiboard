import { actions } from '../../../actions/lists'
import { actions as boardActions } from '../../../actions/boards'
import { reducer as app } from '../'

describe('reducers/lists', () => {
  const initialState = {}

  test('returns the correct initial state', () => {
    const testState = app()
    expect(testState).toMatchObject(initialState)
  })

  test('returns the current state on unknown dispatched actions', () => {
    const action = { type: 'SOME_ACTION' }
    const testState = app({ test: 'someRandomState' }, action)
    expect(testState).toMatchObject({ test: 'someRandomState' })
  })

  test('resets state when RESET_BOARDS is triggered', () => {
    const action = { type: boardActions.RESET_BOARDS }
    const result = app({ test: 'someRandomState' }, action)
    expect(result).toEqual(initialState)
  })

  test('changes isLoading to true when REQUEST is triggered', () => {
    const action = { type: actions.REQUEST, boardId: 'board-1' }
    const result = app(initialState, action)
    expect(result).toMatchObject({
      'board-1': {
        isLoading: true,
      },
    })
  })

  test('changes isLoading, data and error when RECEIVE is triggered', () => {
    const action = {
      type: actions.RECEIVE,
      boardId: 'board-1',
      payload: { randomData: 1 },
      error: null,
    }
    const result = app(initialState, action)
    expect(result).toMatchObject({
      'board-1': {
        isLoading: false,
        data: { randomData: 1 },
        error: null,
      },
    })
  })
})
