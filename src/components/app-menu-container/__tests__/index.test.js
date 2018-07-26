import React from 'react'
import { shallow } from 'enzyme'

import AppMenuContainer from '../'
import PAGES from '../../../pages/pages-config'

describe('Component/AppMenuContainer', () => {
  const Child = () => <span>Child Content</span>

  test('should render without throwing an error', () => {
    const wrapper = shallow(
      <AppMenuContainer pages={PAGES}>
        <Child />
      </AppMenuContainer>,
    )
    expect(wrapper.dive()).toMatchSnapshot()
    expect(wrapper.find(Child).length).toEqual(1)
  })

  test('should render proper withStyles result', () => {
    const wrapper = shallow(
      <AppMenuContainer pages={PAGES}>
        <Child />
      </AppMenuContainer>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
