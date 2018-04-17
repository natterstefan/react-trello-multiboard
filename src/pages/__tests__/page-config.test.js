import React from 'react'
import { mount } from 'enzyme'
import { HashRouter as Router } from 'react-router-dom'
import SyntaxHighlighter from 'react-syntax-highlighter'

import PageConfig from '../page-config'
import ErrorBoundary from '../../components/error-boundary'
import AppContainer from '../../components/app-menu-container'

describe('Page/Config', () => {
  test('should render without throwing an error', () => {
    const wrapper = mount(
      <Router>
        <PageConfig />
      </Router>,
    )
    expect(wrapper.find(ErrorBoundary).length).toBe(1)
    expect(wrapper.find(AppContainer).length).toBe(1)
    expect(wrapper.find(SyntaxHighlighter).length).toBe(1)
  })
})
