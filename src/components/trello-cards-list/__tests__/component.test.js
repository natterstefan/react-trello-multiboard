import React from 'react'
import { shallow } from 'enzyme'

import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'

import TrelloCardsList from '../component'
import TrelloCard from '../../trello-card'

import { mockExampleBoardConfig } from '../../../__mocks__/mocks'

const props = {
  cards: [
    {
      card: {
        id: 'id123',
        idMembers: ['mb1', 'mb2'],
        name: 'example-name',
      },
      config: mockExampleBoardConfig,
    },
  ],
  config: mockExampleBoardConfig,
  list: {
    id: 'list123',
    idBoard: 'b123',
    name: '#upcoming',
  },
  loadCards: jest.fn(),
}

describe('Component/TrelloCardsList', () => {
  test('should render LinearProgress whilst loading', () => {
    const wrapper = shallow(<TrelloCardsList {...props} isLoading />)
    expect(wrapper.find(LinearProgress).length).toEqual(1)
  })

  test('should render a "no cards found" text when nothing is availalbe', () => {
    const wrapper = shallow(<TrelloCardsList {...props} cards={[]} />)
    expect(wrapper.find(Typography).length).toEqual(1)
    expect(
      wrapper
        .find(Typography)
        .children()
        .text(),
    ).toEqual('No matching card(s) found')
  })

  test('should render without throwing an error', () => {
    expect(shallow(<TrelloCardsList {...props} />).length).toEqual(1)
  })

  test('should be selectable by class "list_list123"', () => {
    expect(shallow(<TrelloCardsList {...props} />).is('.list_list123')).toBe(true)
  })

  test('should render one TrelloCard', () => {
    const wrapper = shallow(<TrelloCardsList {...props} />)
    expect(wrapper.find(TrelloCard).length).toEqual(1)
  })

  test('should pass the correct properties to the rendered TrelloCard', () => {
    const wrapper = shallow(<TrelloCardsList {...props} />)
    expect(wrapper.find(TrelloCard).props()).toMatchObject({
      card: { ...props.cards[0].card },
      listName: props.list.name,
    })
  })

  test('should not loadCards once mounted by default', () => {
    const loadCards = jest.fn()
    shallow(<TrelloCardsList {...props} loadCards={loadCards} />)
    expect(loadCards).toHaveBeenCalledTimes(0)
  })

  test('should loadCards once mounted and shouldUpdate is true', () => {
    const loadCards = jest.fn()
    shallow(<TrelloCardsList {...props} loadCards={loadCards} shouldUpdate />)
    expect(loadCards).toHaveBeenCalledTimes(1)
  })

  test('should loadCards once mounted and no cards are loaded (available)', () => {
    const loadCards = jest.fn()
    shallow(<TrelloCardsList {...props} loadCards={loadCards} cards={[]} />)
    expect(loadCards).toHaveBeenCalledTimes(1)
  })
})
