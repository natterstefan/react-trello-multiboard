import React from 'react'
import { mount, shallow } from 'enzyme'
import { HashRouter as Router } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'

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
    expect(wrapper.find(ListItem).length).toBe(4)
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
    expect(
      wrapper
        .find(ListItem)
        .at(2)
        .prop('to'),
    ).toBe('/privacy')
    expect(
      wrapper
        .find(ListItem)
        .at(3)
        .prop('to'),
    ).toBe('/github')
  })
})
