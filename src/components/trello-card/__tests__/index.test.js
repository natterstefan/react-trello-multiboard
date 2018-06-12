/**
 * STORE & CONTAINER TESTS
 *
 * DOCS - How to test Redux store (actions and redux) and containers
 *  - https://redux.js.org/recipes/writing-tests
 *  - https://github.com/arnaudbenard/redux-mock-store
 *
 * Examples
 *  - http://enthudrives.com/blog/unit-testing-redux-containers/
 *  - https://jsramblings.com/2018/01/15/3-ways-to-test-mapStateToProps-and-mapDispatchToProps.html
 *
 * Other inspirations/ideas
 * - https://github.com/reactjs/react-redux/issues/325#issuecomment-262223079
 */
import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { props, storeStateMock } from '../__mocks__/trello-card'

// inspired by https://github.com/reactjs/redux/issues/1534#issuecomment-205061049
const mockStore = configureMockStore([thunk])

describe('Component/TrelloCardContainer', () => {
  let store
  const mockDispatch = jest.fn()
  const mockAddMembersEstimation = jest.fn()
  const mockAddBoardEstimations = jest.fn()

  beforeEach(() => {
    store = mockStore(storeStateMock)
    store.dispatch = mockDispatch

    // reset counts
    mockDispatch.mockReset()
    mockAddMembersEstimation.mockReset()
    mockAddBoardEstimations.mockReset()

    // see https://github.com/facebook/jest/issues/2567#issuecomment-345805358
    jest.mock('../../../actions/members', () => ({
      addMembersEstimation: mockAddMembersEstimation,
    }))
    jest.mock('../../../actions/boards', () => ({
      addBoardEstimations: mockAddBoardEstimations,
    }))
  })

  afterAll(() => {
    jest.resetModules()
  })

  test('should get data from the store and prepare props without throwing an error', () => {
    const TrelloCardContainer = require('../').default
    const wrapper = shallow(
      <TrelloCardContainer
        store={store}
        card={props.card}
        config={props.config}
        listName="example-list"
      />,
    )

    const expectedTrelloCardProps = {
      addEstimations: expect.any(Function),
      boardName: 'example-board',
      card: props.card,
      config: props.config,
      isHidden: false,
      listName: 'example-list',
    }

    expect(wrapper.props()).toEqual(
      expect.objectContaining({
        ...expectedTrelloCardProps,
      }),
    )
  })

  test('should dispatch addMembersEstimation and addBoardEstimations', () => {
    const TrelloCardContainer = require('../').default
    const wrapper = shallow(
      <TrelloCardContainer
        store={store}
        card={props.card}
        config={props.config}
        listName="example-list"
      />,
    )

    wrapper.props().addEstimations()
    expect(store.dispatch).toHaveBeenCalledTimes(2)
    expect(mockAddMembersEstimation).toHaveBeenCalledTimes(1)
    expect(mockAddBoardEstimations).toHaveBeenCalledTimes(1)
  })
})
