import React from 'react'
import { shallow } from 'enzyme'

import Snackbar from '@material-ui/core/Snackbar'

import Notification from '../component'

describe('Component/Notification', () => {
  const props = {
    message: 'Test Message',
  }

  test('should render without throwing an error', () => {
    const wrapper = shallow(<Notification {...props} />).dive()
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find(Snackbar)).toHaveLength(1)
  })

  test('should render null when message is not present', () => {
    const wrapper = shallow(<Notification />).dive()
    expect(wrapper.html()).toEqual(null)
  })

  test('should have a default open state of false when no props.message is available', () => {
    const wrapper = shallow(<Notification />).dive()
    const instance = wrapper.instance()
    expect(instance.state).toEqual({ open: false })
  })

  test('should have a default open state of true when props.message is available', () => {
    const wrapper = shallow(<Notification {...props} />).dive()
    const instance = wrapper.instance()
    expect(instance.state).toEqual({ open: true })
  })

  test('should adjust the autoHideDuration when props.autoHideDuration is set', () => {
    const wrapper = shallow(<Notification {...props} autoHideDuration={1000} />).dive()
    expect(wrapper.find(Snackbar).prop('autoHideDuration')).toEqual(1000)
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
