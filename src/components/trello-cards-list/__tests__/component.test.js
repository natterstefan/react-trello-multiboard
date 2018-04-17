import React from 'react'
import { shallow } from 'enzyme'

import { LinearProgress } from 'material-ui/Progress'
import Typography from 'material-ui/Typography'

import TrelloCardsList from '../component'
import TrelloCard from '../../trello-card'

const props = {
  cards: [
    {
      card: {
        id: 'id123',
        idMembers: ['mb1', 'mb2'],
        name: 'example-name',
      },
      config: {},
    },
  ],
  config: {
    board: 'board-1',
    estimates_with_round_brackets: false,
    estimates_with_square_brackets: false,
    shortcut: 'b1',
  },
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
    expect(wrapper.find(TrelloCard).props()).toEqual(props.cards[0])
  })

  test('should loadCards once mounted', () => {
    const loadCards = jest.fn()
    shallow(<TrelloCardsList {...props} loadCards={loadCards} />)
    expect(loadCards).toHaveBeenCalledTimes(1)
  })
})
