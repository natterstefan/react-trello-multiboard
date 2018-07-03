import { actions as appActions } from '../../actions/app'

describe('middleware/history', () => {
  let history
  const mockPush = jest.fn()
  const nextMock = jest.fn()
  const storeMock = {
    dispatch: jest.fn(),
  }

  beforeEach(() => {
    mockPush.mockReset()
    nextMock.mockReset()
    storeMock.dispatch.mockReset()

    jest.mock('connected-react-router', () => ({
      push: mockPush,
    }))

    history = require('../history').default
  })

  afterEach(() => {
    history = null
  })

  afterAll(() => {
    jest.resetModules()
  })

  test('dispatches next action by default', () => {
    const action = {
      type: 'some-type',
    }
    history(storeMock)(nextMock)(action)
    expect(nextMock).toHaveBeenCalledTimes(1)
  })

  test('dispatches next action after pushing a new history', () => {
    const action = {
      pattern: '/list-1',
      type: appActions.TOGGLE_PREFERRED_LIST,
    }
    history(storeMock)(nextMock)(action)
    expect(storeMock.dispatch).toHaveBeenCalledTimes(1)
    expect(mockPush).toHaveBeenCalledWith('/pattern/list-1')
    expect(nextMock).toHaveBeenCalledTimes(1)
  })

  test('adds a slash to an "invalid" path', () => {
    const action = {
      pattern: 'list-1',
      type: appActions.TOGGLE_PREFERRED_LIST,
    }
    history(storeMock)(nextMock)(action)
    expect(mockPush).toHaveBeenCalledWith('/pattern/list-1')
  })

  test('does not dispach when pattern is not set', () => {
    const action = {
      pattern: undefined,
      type: appActions.TOGGLE_PREFERRED_LIST,
    }
    history(storeMock)(nextMock)(action)
    expect(storeMock.dispatch).toHaveBeenCalledTimes(0)
    expect(nextMock).toHaveBeenCalledTimes(1)
  })
})
