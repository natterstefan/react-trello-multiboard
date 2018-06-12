import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { props, storeStateMock } from '../__mocks__/props'

// inspired by https://github.com/reactjs/redux/issues/1534#issuecomment-205061049
const mockStore = configureMockStore([thunk])

describe('Component/BoardContainer', () => {
  let store
  const mockDispatch = jest.fn()
  const mockRequestLists = jest.fn()

  beforeEach(() => {
    store = mockStore(storeStateMock)
    store.dispatch = mockDispatch

    // reset counts
    mockDispatch.mockReset()
    mockRequestLists.mockReset()

    // see https://github.com/facebook/jest/issues/2567#issuecomment-345805358
    jest.mock('../../../actions/lists', () => ({
      requestLists: mockRequestLists,
    }))
  })

  afterAll(() => {
    jest.resetModules()
  })

  test('should get data from the store and prepare props without throwing an error', () => {
    const BoardContainer = require('../').default
    const wrapper = shallow(<BoardContainer store={store} board={props.board} />)

    const expectedBoardProps = {
      board: props.board,
      error: null,
      isLoading: false,
      lists: [
        {
          id: 'list-123',
          idBoard: 'board-1',
          name: 'Test List Name #upcoming',
        },
      ],
      loadLists: expect.any(Function),
      resetEstimations: expect.any(Function),
    }

    expect(wrapper.props()).toEqual(
      expect.objectContaining({
        ...expectedBoardProps,
      }),
    )
  })
})
