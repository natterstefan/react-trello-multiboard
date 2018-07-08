import React from 'react'
import { shallow } from 'enzyme'
import CookieNotice from '../'

describe('Component/CookieNotice', () => {
  test('should render without throwing an error', () => {
    expect(shallow(<CookieNotice />)).toMatchSnapshot()
  })
})
