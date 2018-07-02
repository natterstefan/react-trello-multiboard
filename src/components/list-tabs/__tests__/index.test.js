import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { storeStateMock } from '../__mocks__/list-tabs'

// inspired by https://github.com/reactjs/redux/issues/1534#issuecomment-205061049
const mockStore = configureMockStore([thunk])

describe('Component/ListTabsContainer', () => {
  let store
  const mockToggleList = jest.fn()
  const mockDispatch = jest.fn()

  beforeEach(() => {
    store = mockStore(storeStateMock)
    store.dispatch = mockDispatch

    // reset counts
    mockDispatch.mockReset()
    mockToggleList.mockReset()

    // see https://github.com/facebook/jest/issues/2567#issuecomment-345805358
    jest.mock('../../../actions/app', () => ({
      toggleList: mockToggleList,
    }))
  })

  afterAll(() => {
    jest.resetModules()
  })

  test('should get data from the store and prepare props without throwing an error', () => {
    const ListTabsContainer = require('../').default
    const wrapper = shallow(<ListTabsContainer store={store} />)

    const expectedListTabsProps = {
      changeListToggle: expect.any(Function),
      toggleList: 'list-1',
      listsConfig: ['list-1', 'list-2'],
    }

    expect(wrapper.props()).toEqual(
      expect.objectContaining({
        ...expectedListTabsProps,
      }),
    )
  })

  test('should dispatch toggleList', () => {
    const ListTabsContainer = require('../').default
    const wrapper = shallow(<ListTabsContainer store={store} />)

    wrapper.props().changeListToggle()
    expect(store.dispatch).toHaveBeenCalledTimes(1)
    expect(mockToggleList).toHaveBeenCalledTimes(1)
  })
})
