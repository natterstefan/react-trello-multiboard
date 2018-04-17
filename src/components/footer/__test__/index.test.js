import React from 'react'
import { shallow } from 'enzyme'

import Footer from '../'

describe('Component/MainApp', () => {
  test('should render without throwing an error', () => {
    const wrapper = shallow(<Footer />)
    expect(wrapper).toMatchSnapshot()
  })
})
