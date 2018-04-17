import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { actions, requestCards } from '../'

// some static mocks
import {
  mockExampleBoardConfig as config,
  mockExampleCardsResponse as card,
} from '../../../__mocks__/mocks'

// mock data trello (see data/__mocks__/trello)
jest.mock('../../../data/trello')

describe('actions/cards', () => {
  const expectedActions = {
    REQUEST: 'REQUEST_CARD',
    RECEIVE: 'RECEIVE_CARD',
  }

  test('returns the correct actions', () => {
    expect(actions).toMatchObject(expectedActions)
  })
})

describe('actions/cards:async actions', () => {
  // docs/some links
  // - https://redux.js.org/recipes/writing-tests#async-action-creators
  // - https://stackoverflow.com/a/45082119/1238150
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  afterAll(() => {
    jest.resetModules()
    jest.unmock('../../../data/trello')
  })

  it('creates RECEIVE when fetching cards has been done', async () => {
    const list = {
      id: 'list-123',
    }

    // payload is set in setup-jest.js (config mock)
    const expectedActions = [
      { listId: 'list-123', type: actions.REQUEST },
      {
        error: null,
        listId: 'list-123',
        payload: [
          {
            card,
            config,
          },
        ],
        type: actions.RECEIVE,
      },
    ]
    const store = mockStore({})
    await store.dispatch(requestCards(list, config))
    expect(store.getActions()).toEqual(expectedActions)
  })
})
