import React from 'react'
import { shallow, mount } from 'enzyme'
import { HashRouter as Router } from 'react-router-dom'
import SyntaxHighlighter from 'react-syntax-highlighter'

import ConfigPage from '../page-config'
import Layout from '../../layout'

describe('Page/Config', () => {
  test('should render without throwing an error', () => {
    const wrapper = shallow(<ConfigPage />)
    expect(wrapper).toHaveLength(1)
  })

  test('should render a Layout', () => {
    const wrapper = mount(
      <Router>
        <ConfigPage />
      </Router>,
    )
    expect(wrapper.find(Layout).length).toBe(1)
  })

  test('should render with SyntaxHighlighter as a child of Layout', () => {
    const wrapper = mount(
      <Router>
        <ConfigPage />
      </Router>,
    )
    expect(wrapper.find(ConfigPage)).toHaveLength(1)
    expect(wrapper.find(SyntaxHighlighter)).toHaveLength(1)
  })
})
