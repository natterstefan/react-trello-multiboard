import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {
  props,
  storeStateMock,
  storeWithBoardError,
  storeWithAnyError,
} from '../__mocks__/notification'

// inspired by https://github.com/reactjs/redux/issues/1534#issuecomment-205061049
const mockStore = configureMockStore([thunk])

describe('Component/NotificationContainer', () => {
  let store
  beforeEach(() => {
    window.localStorage.removeItem.mockReset()
    store = mockStore(storeStateMock)
  })

  afterAll(() => {
    jest.resetModules()
  })

  test('should get data from the store and prepare props without throwing an error', () => {
    const NotificationContainer = require('../').default
    const wrapper = shallow(<NotificationContainer store={store} {...props} someOtherProp />)

    const expectedProps = {
      autoHideDuration: 10000,
      message: 'some notification',
      someOtherProp: true,
    }

    expect(wrapper.props()).toEqual(expect.objectContaining(expectedProps))
  })

  test('should show a different message when board.error met certain conditions', () => {
    store = mockStore(storeWithBoardError)
    const NotificationContainer = require('../').default
    const wrapper = shallow(<NotificationContainer store={store} {...props} />)

    const expectedProps = {
      autoHideDuration: 60000,
      message:
        'example response: Please reload the page and try it again. Optional: delete localStorage as well.',
    }

    expect(wrapper.props()).toEqual(expect.objectContaining(expectedProps))
  })

  test('should remove an item from localStorage when board.error met certain conditions', () => {
    store = mockStore(storeWithBoardError)
    const NotificationContainer = require('../').default
    shallow(<NotificationContainer store={store} {...props} />)
    expect(window.localStorage.removeItem).toHaveBeenCalledTimes(1)
    expect(window.localStorage.removeItem).toHaveBeenCalledWith('trello_token')
  })

  test('should show a default error message when other errors then the 401-board.error are available', () => {
    store = mockStore(storeWithAnyError)
    const NotificationContainer = require('../').default
    const wrapper = shallow(<NotificationContainer store={store} {...props} />)

    const expectedProps = {
      autoHideDuration: 10000,
      message: 'An error occured. Please try it again later.',
    }

    expect(wrapper.props()).toEqual(expect.objectContaining(expectedProps))
  })
})
