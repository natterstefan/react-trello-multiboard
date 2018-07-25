// TODO test Config.google_analytics_property = false case
import React from 'react'
import { mount, shallow } from 'enzyme'
import { HashRouter as Router } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'

import AppMenuContent from '../menu'
import PAGES from '../../../pages/pages-config'

describe('Component/AppMenuContent', () => {
  test('should render without throwing an error', () => {
    expect(shallow(<AppMenuContent pages={PAGES} />)).toMatchSnapshot()
  })

  test('should render the proper number of ListItems', () => {
    const wrapper = mount(
      <Router>
        <AppMenuContent pages={PAGES} />
      </Router>,
    )
    expect(wrapper.find(ListItem).length).toBe(3)
  })

  test('should render the proper order of ListItems', () => {
    const wrapper = mount(
      <Router>
        <AppMenuContent pages={PAGES} />
      </Router>,
    )

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
    ).toBe('/github')
    expect(
      wrapper
        .find(ListItem)
        .at(2)
        .prop('to'),
    ).toBe('/privacy')
  })
})
