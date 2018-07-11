import React from 'react'
import { shallow } from 'enzyme'

import PrivacyPage, { PrivacyContent } from '../page-privacy'
import Layout from '../../layout'

describe('Page/PrivacyPage', () => {
  test('should render without throwing an error', () => {
    const wrapper = shallow(<PrivacyPage />)
    expect(wrapper).toHaveLength(1)
  })

  test('should render a Layout', () => {
    const wrapper = shallow(<PrivacyPage />)
    expect(wrapper.find(Layout).length).toBe(1)
  })

  test('should render with PrivacyContent as a child of Layout', () => {
    const wrapper = shallow(<PrivacyPage />)
    expect(wrapper.dive().find(PrivacyContent).length).toBe(1)
  })
})
