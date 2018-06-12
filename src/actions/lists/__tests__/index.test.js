import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { actions, requestLists } from '../'

// some static mocks
import {
  mockExampleBoardConfig as config,
  mockExampleListResponse as list,
} from '../../../__mocks__/mocks'

// mock data trello (see data/__mocks__/trello)
jest.mock('../../../data/trello')

describe('actions/cards', () => {
  const expectedActions = {
    REQUEST: 'REQUEST_LIST',
    RECEIVE: 'RECEIVE_LIST',
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

  test('creates RECEIVE when fetching cards has been done', async () => {
    const exampleBoard = {
      id: 'board-1',
    }

    // payload is set in setup-jest.js (config mock)
    const expectedActions = [
      { boardId: 'board-1', type: actions.REQUEST },
      {
        error: null,
        boardId: 'board-1',
        payload: [
          {
            list,
            config,
            pattern: '/#upcoming/',
          },
        ],
        type: actions.RECEIVE,
      },
    ]
    const store = mockStore({})
    await store.dispatch(requestLists(exampleBoard, config))
    expect(store.getActions()).toEqual(expectedActions)
  })
})
