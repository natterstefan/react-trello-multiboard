import React from 'react'
import { shallow } from 'enzyme'

import AppMenuContainer from '../'

describe('Component/AppMenuContainer', () => {
  const Child = () => <span>Child Content</span>

  test('should render without throwing an error', () => {
    const wrapper = shallow(
      <AppMenuContainer>
        <Child />
      </AppMenuContainer>,
    )
    expect(wrapper.dive()).toMatchSnapshot()
    expect(wrapper.find(Child).length).toEqual(1)
  })
})
