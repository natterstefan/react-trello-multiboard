import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { mockExampleUser1, mockExampleBoardResponse } from '../../../__mocks__/mocks'
import { storeStateMock } from '../__mocks__/boards-list'

// inspired by https://github.com/reactjs/redux/issues/1534#issuecomment-205061049
const mockStore = configureMockStore([thunk])

describe('Component/BoardsListContainer', () => {
  let store

  beforeEach(() => {
    store = mockStore(storeStateMock)
  })

  afterAll(() => {
    jest.resetModules()
  })

  test('should get data from the store and prepare props without throwing an error', () => {
    const BoardsListContainer = require('../').default
    const wrapper = shallow(<BoardsListContainer store={store} />)

    const boardsList = [{ board: mockExampleBoardResponse }]
    const expectedProps = {
      boardsList: {
        boards: {
          data: [{ board: { name: 'hello-world', id: 'board-1' } }],
          error: null,
          isLoading: true,
        },
        members: { members: [mockExampleUser1] },
        memberToggle: { togglePreferred: false, togglePreferredMember: null },
      },
      boards: boardsList,
      error: null,
      getEstimations: expect.any(Function),
      isLoading: true,
    }

    expect(wrapper.props()).toEqual(expect.objectContaining(expectedProps))
  })
})
