import React from 'react'
import { shallow } from 'enzyme'

describe('Component/TrelloMultiBoard', () => {
  const ReactDom = require('react-dom')
  let TrelloMultiBoard

  beforeAll(() => {
    // Mocks
    ReactDom.render = jest.fn()

    // import once everything is mocked
    TrelloMultiBoard = require('../index').TrelloMultiboard
  })

  afterAll(() => {
    jest.unmock('react-dom')
    ReactDom.render.mockReset()
  })

  test('should render without throwing an error', () => {
    expect(shallow(<TrelloMultiBoard />)).toMatchSnapshot()
  })
})
