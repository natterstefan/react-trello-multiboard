import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {
  mockExampleCardsResponse,
  mockExampleBoardConfig,
  mockExampleListResponse,
} from '../../../__mocks__/mocks'
import { props, storeStateMock } from '../__mocks__/trello-cards-list'

// inspired by https://github.com/reactjs/redux/issues/1534#issuecomment-205061049
const mockStore = configureMockStore([thunk])

describe('Component/TrelloCardsListContainer', () => {
  let store
  const mockRequestCards = jest.fn()
  const mockDispatch = jest.fn()

  beforeEach(() => {
    store = mockStore(storeStateMock)
    store.dispatch = mockDispatch

    // reset counts
    mockDispatch.mockReset()
    mockRequestCards.mockReset()

    // see https://github.com/facebook/jest/issues/2567#issuecomment-345805358
    jest.mock('../../../actions/cards', () => ({
      requestCards: mockRequestCards,
    }))
  })

  afterAll(() => {
    jest.resetModules()
  })

  test('should get data from the store and prepare props without throwing an error', () => {
    const TrelloCardsListContainer = require('../').default
    const wrapper = shallow(<TrelloCardsListContainer {...props} store={store} />)

    const expectedProps = {
      loadCards: expect.any(Function),
      list: mockExampleListResponse,
      config: mockExampleBoardConfig,
      error: null,
      cards: [
        {
          card: mockExampleCardsResponse,
          config: mockExampleBoardConfig,
        },
      ],
      isLoading: true,
    }

    expect(wrapper.props()).toEqual(
      expect.objectContaining({
        ...expectedProps,
      }),
    )
  })

  test('should dispatch requestCards', () => {
    const TrelloCardsListContainer = require('../').default
    const wrapper = shallow(<TrelloCardsListContainer {...props} store={store} />)

    wrapper.props().loadCards()
    expect(store.dispatch).toHaveBeenCalledTimes(1)
    expect(mockRequestCards).toHaveBeenCalledTimes(1)
  })
})
