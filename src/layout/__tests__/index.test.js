import React from 'react'
import { shallow } from 'enzyme'

import Layout from '../'
import ErrorBoundary from '../../components/error-boundary'
import AppContainer from '../../components/app-menu-container'
import CookieNotice from '../../components/cookie-notice'

describe('Layout/Layout', () => {
  let wrapper
  const props = {
    pages: [{ target: '/some-target' }],
  }

  beforeEach(() => {
    wrapper = shallow(
      <Layout {...props}>
        <span>SomeChild</span>
      </Layout>,
    )
  })

  test('should render without throwing an error', () => {
    expect(wrapper).toHaveLength(1)
  })

  test('should render a child component', () => {
    expect(wrapper.find('span')).toHaveLength(1)
  })

  test('should render all layout components properly', () => {
    expect(wrapper.find(ErrorBoundary)).toHaveLength(1)
    expect(wrapper.find(AppContainer)).toHaveLength(1)
    expect(wrapper.find(CookieNotice)).toHaveLength(1)
  })

  test('should render AppContainer with the correct props', () => {
    const element = wrapper.find(AppContainer)
    expect(element.prop('pages')).toEqual([{ target: '/some-target' }])
  })
})
