import React from 'react'
import { shallow, mount } from 'enzyme'
import { HashRouter as Router } from 'react-router-dom'
import SyntaxHighlighter from 'react-syntax-highlighter'

import ConfigPage from '../page-config'

describe('Page/Config', () => {
  test('should render without throwing an error', () => {
    const wrapper = shallow(<ConfigPage />)
    expect(wrapper).toMatchSnapshot()
  })

  test('should render with SyntaxHighlighter as a child of the page', () => {
    const wrapper = mount(
      <Router>
        <ConfigPage />
      </Router>,
    )
    expect(wrapper.find(ConfigPage)).toHaveLength(1)
    expect(wrapper.find(SyntaxHighlighter)).toHaveLength(1)
  })
})
