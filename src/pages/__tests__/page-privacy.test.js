import React from 'react'
import { shallow } from 'enzyme'

import PrivacyPage, { PrivacyContent } from '../page-privacy'
import ErrorBoundary from '../../components/error-boundary'
import AppContainer from '../../components/app-menu-container'

describe('Page/Privacy', () => {
  test('should render without throwing an error', () => {
    const wrapper = shallow(<PrivacyPage />)
    expect(wrapper.find(ErrorBoundary).length).toBe(1)
    expect(wrapper.find(AppContainer).length).toBe(1)
    expect(wrapper.find(PrivacyContent).length).toBe(1)
  })
})
