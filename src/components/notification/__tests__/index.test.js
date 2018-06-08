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
})
