import React from 'react'
import { shallow } from 'enzyme'

import PageApp from '../page-app'
import ErrorBoundary from '../../components/error-boundary'
import AppContainer from '../../components/app-menu-container'
import MainApp from '../../components/main-app'

describe('Page/App', () => {
  test('should render without throwing an error', () => {
    const wrapper = shallow(<PageApp />)
    expect(wrapper.find(ErrorBoundary).length).toBe(1)
    expect(wrapper.find(AppContainer).length).toBe(1)
    expect(wrapper.find(MainApp).length).toBe(1)
  })
})
