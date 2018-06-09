import React from 'react'
import { shallow } from 'enzyme'

import Notification from '../'

describe('Component/Notification', () => {
  const props = {
    message: 'Test Message',
  }

  test('should render without throwing an error', () => {
    expect(shallow(<Notification {...props} />).dive()).toMatchSnapshot()
  })

  test('should have a default open state of false when no props.message is available', () => {
    const wrapper = shallow(<Notification />).dive()
    const instance = wrapper.instance()

    expect(instance.state).toEqual({ open: false })
  })

  test('should return undefined when handleClose was called with reason "clickaway"', () => {
    const wrapper = shallow(<Notification {...props} />).dive()
    const instance = wrapper.instance()
    expect(instance.handleClose(null, 'clickaway')).toBe(undefined)
  })

  test('should change the state of state.open when handleClose was called with another reason than "clickaway"', () => {
    const wrapper = shallow(<Notification {...props} />).dive()
    const instance = wrapper.instance()

    expect(instance.state).toEqual({ open: true })
    instance.handleClose(null)
    expect(instance.state).toEqual({ open: false })
  })
})
