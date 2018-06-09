import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { actions, authenticateUser } from '../'

// mock data trello (see data/__mocks__/trello)
jest.mock('../../../data/trello')

describe('actions/app', () => {
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  afterAll(() => {
    jest.resetModules()
    jest.unmock('../../../data/trello')
  })

  test('returns the correct actions', () => {
    const expectedActions = {
      START_AUTHORIZING: 'START_AUTHORIZING',
      DONE_AUTHORIZING: 'DONE_AUTHORIZING',
    }
    expect(actions).toMatchObject(expectedActions)
  })

  test('dispatches DONE_AUTHORIZING when user is authenticated successfully', async () => {
    const expectedActions = [
      { type: actions.START_AUTHORIZING },
      {
        type: actions.DONE_AUTHORIZING,
        success: true,
        error: null,
      },
    ]
    const store = mockStore({})
    await store.dispatch(authenticateUser())
    expect(store.getActions()).toEqual(expectedActions)
  })
})
