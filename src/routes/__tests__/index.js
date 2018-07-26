import React from 'react'
import { shallow } from 'enzyme'

import Routes from '../'

describe('Routes', () => {
  test('should render without throwing an error', () => {
    expect(shallow(<Routes />)).toMatchSnapshot()
  })
})
