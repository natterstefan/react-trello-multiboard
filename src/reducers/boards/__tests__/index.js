import { actions } from '../../../actions/boards'
import { actions as appActions } from '../../../actions/app'
import { reducer as app } from '../'

describe('reducers/boards', () => {
  const initialState = {
    data: null, // contains the board objects
    error: null,
    isLoading: false,
  }

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
    const action = { type: actions.RESET_BOARDS }
    const result = app({ test: 'someRandomState' }, action)
    expect(result).toEqual(initialState)
  })

  test('resets estimations when RESET_ESTIMATIONS is triggered', () => {
    const action = { type: appActions.RESET_ESTIMATIONS }
    const result = app(
      { data: [{ id: 'board-1', estimations: { consumed: 1, estimated: 1 } }] },
      action,
    )
    expect(result).toEqual({ data: [{ id: 'board-1', estimations: undefined }] })
  })

  test('changes isLoading to true when REQUEST is triggered', () => {
    const action = { type: actions.REQUEST }
    const result = app(initialState, action)
    expect(result).toMatchObject({
      isLoading: true,
      error: null,
    })
  })

  test('changes isLoading, data and error when RECEIVE is triggered', () => {
    const action = {
      type: actions.RECEIVE,
      payload: { randomData: 1 },
      error: null,
    }
    const result = app(initialState, action)
    expect(result).toMatchObject({
      isLoading: false,
      data: { randomData: 1 },
      error: null,
    })
  })

  test('increases estimations when ADD_BOARD_ESTIMATION is triggered, even multiple times', () => {
    const action = {
      type: actions.ADD_BOARD_ESTIMATION,
      payload: {
        boardId: 'board-1',
        estimations: {
          estimated: 1,
          consumed: 2,
        },
      },
    }
    const currentState = {
      ...initialState,
      data: [
        {
          board: { id: 'board-1' },
          estimations: undefined,
        },
      ],
    }

    expect(app(currentState, action)).toMatchObject({
      isLoading: false,
      data: [
        {
          board: { id: 'board-1' },
          estimations: {
            estimated: 1,
            consumed: 2,
          },
        },
      ],
      error: null,
    })

    // running it again should increase estimations again
    expect(app(currentState, action)).toMatchObject({
      isLoading: false,
      data: [
        {
          board: { id: 'board-1' },
          estimations: {
            estimated: 2,
            consumed: 4,
          },
        },
      ],
      error: null,
    })
  })
})
