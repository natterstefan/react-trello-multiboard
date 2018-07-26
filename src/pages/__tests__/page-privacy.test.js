import React from 'react'
import { shallow } from 'enzyme'

import PrivacyPage from '../page-privacy'

describe('Page/PrivacyPage', () => {
  test('should render without throwing an error', () => {
    const wrapper = shallow(<PrivacyPage />)
    expect(wrapper).toHaveLength(1)
  })

  test('should render with PrivacyContent as a child of Layout', () => {
    const wrapper = shallow(<PrivacyPage />)
    expect(wrapper.find('#privacy').length).toBe(1)
    expect(wrapper.find('#privacy').html()).toContain('Hello Privacy.md!')
  })
})
