import React from 'react'
import { mount, shallow } from 'enzyme'
import { HashRouter as Router } from 'react-router-dom'
import { ListItem } from 'material-ui/List'

import AppMenuContent from '../menu'

describe('Component/AppMenuContent', () => {
  test('should render without throwing an error', () => {
    expect(shallow(<AppMenuContent />)).toMatchSnapshot()
  })

  test('should pass the correct properties to the rendered ListItems', () => {
    const wrapper = mount(
      <Router>
        <AppMenuContent />
      </Router>,
    )
    expect(wrapper.find(ListItem).length).toBe(3)
    expect(
      wrapper
        .find(ListItem)
        .first()
        .prop('to'),
    ).toBe('/')
    expect(
      wrapper
        .find(ListItem)
        .at(1)
        .prop('to'),
    ).toBe('/config')
  })
})
