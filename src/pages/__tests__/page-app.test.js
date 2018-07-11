import React from 'react'
import { shallow } from 'enzyme'

import AppPage from '../page-app'

import Layout from '../../layout'
import MainApp from '../../components/main-app'

describe('Page/AppPage', () => {
  test('should render without throwing an error', () => {
    const wrapper = shallow(<AppPage />)
    expect(wrapper).toHaveLength(1)
  })

  test('should render a Layout', () => {
    const wrapper = shallow(<AppPage />)
    expect(wrapper.find(Layout).length).toBe(1)
  })

  test('should render with MainApp as a child of Layout', () => {
    const wrapper = shallow(<AppPage />)
    expect(wrapper.dive().find(MainApp).length).toBe(1)
  })
})
