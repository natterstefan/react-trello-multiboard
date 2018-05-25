import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { actions, addBoardEstimations, receiveBoards, requestBoards, resetBoards } from '../'

// some static mocks
import {
  mockExampleBoardConfig as config,
  mockExampleBoardResponse as board,
} from '../../../__mocks__/mocks'

// mock data trello (see data/__mocks__/trello)
jest.mock('../../../data/trello')

describe('actions/board', () => {
  const expectedActions = {
    RESET_BOARDS: 'RESET_BOARDS',
    REQUEST: 'REQUEST_BOARDS',
    RECEIVE: 'RECEIVE_BOARDS',
    ADD_BOARD_ESTIMATION: 'ADD_BOARD_ESTIMATION',
  }

  test('returns the correct actions', () => {
    expect(actions).toMatchObject(expectedActions)
  })

  test('addBoardEstimations should return correct actions object', () => {
    // TODO: typechecking, eg. estimations should be an object
    const boardId = 'board-1'
    const estimations = 'dummy-estimations'

    expect(addBoardEstimations(boardId, estimations)).toMatchObject({
      type: actions.ADD_BOARD_ESTIMATION,
      payload: { boardId, estimations },
    })
  })

  test('receiveBoards should return correct actions object', () => {
    // TODO: typechecking, eg. data should be an object
    const data = 'dummy-data'
    const error = null
    expect(receiveBoards(data, error)).toMatchObject({
      type: actions.RECEIVE,
      payload: data,
      error,
    })
  })
})

describe('actions/board:async actions', () => {
  // docs/some links
  // - https://redux.js.org/recipes/writing-tests#async-action-creators
  // - https://stackoverflow.com/a/45082119/1238150
  const middlewares = [thunk]
  const mockStore = configureMockStore(middlewares)

  afterAll(() => {
    jest.resetModules()
    jest.unmock('../../../data/trello')
  })

  test('dispatches RECEIVE when fetching boards has been done', async () => {
    // payload is set in setup-jest.js (config mock)
    const expectedActions = [
      { type: actions.REQUEST },
      {
        type: actions.RECEIVE,
        error: null,
        payload: [
          {
            board,
            config,
          },
        ],
      },
    ]
    const store = mockStore({})
    await store.dispatch(requestBoards())
    expect(store.getActions()).toEqual(expectedActions)
  })

  test('resetBoards should dispatch correct actions', async () => {
    const store = mockStore({})
    await store.dispatch(resetBoards())
    const expectedActions = [{ type: actions.RESET_BOARDS }, { type: actions.REQUEST }]
    expect(store.getActions()).toEqual(expectedActions)
  })
})
