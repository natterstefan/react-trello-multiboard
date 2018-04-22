import React from 'react'
import { shallow } from 'enzyme'
// https://github.com/styled-components/jest-styled-components
import 'jest-styled-components'

import { BlockContainer, ScrollContainer } from '../index'

describe('StyledComponents', () => {
  test('should render an BlockContainer with the proper styling', () => {
    expect(shallow(<BlockContainer />)).toMatchSnapshot()
  })

  test('should render an ScrollContainer with the proper styling', () => {
    expect(shallow(<ScrollContainer />)).toMatchSnapshot()
  })
})
