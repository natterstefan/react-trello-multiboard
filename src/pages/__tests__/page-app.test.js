import React from 'react'
import { shallow } from 'enzyme'

import AppPage from '../page-app'

describe('Page/AppPage', () => {
  test('should render without throwing an error', () => {
    const wrapper = shallow(<AppPage />)
    expect(wrapper).toMatchSnapshot()
  })
})
