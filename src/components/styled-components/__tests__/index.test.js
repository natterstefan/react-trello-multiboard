import React from 'react'
import { shallow } from 'enzyme'
// https://github.com/styled-components/jest-styled-components
import 'jest-styled-components'

import { AppContainer, BlockContainer, ColumnContainer, Container, ListContainer } from '../index'

describe('StyledComponents', () => {
  test('should render an AppContainer with the proper styling', () => {
    expect(shallow(<AppContainer />)).toMatchSnapshot()
  })

  test('should render an BlockContainer with the proper styling', () => {
    expect(shallow(<BlockContainer />)).toMatchSnapshot()
  })

  test('should render an ColumnContainer with the proper styling', () => {
    expect(shallow(<ColumnContainer />)).toMatchSnapshot()
  })

  test('should render an Container with the proper styling', () => {
    expect(shallow(<Container />)).toMatchSnapshot()
  })

  test('should render an ListContainer with the proper styling', () => {
    expect(shallow(<ListContainer />)).toMatchSnapshot()
  })
})
