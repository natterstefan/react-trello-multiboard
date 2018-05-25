import React from 'react'
import { shallow } from 'enzyme'

import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'

import Board from '../component'
import TrelloCardsList from '../../trello-cards-list'

const props = {
  error: null,
  lists: [
    {
      list: {
        id: 'list-123',
        idBoard: 'board-123',
        name: 'ListName',
      },
      config: {},
    },
  ],
  isLoading: false,
}

describe('Component/Board', () => {
  test('should render without throwing an error', () => {
    expect(shallow(<Board {...props} />)).toMatchSnapshot()
  })

  test('should render an LinearProgress when component is waiting for loading data to finish', () => {
    const wrapper = shallow(<Board {...props} isLoading />)
    expect(wrapper.find(LinearProgress).length).toEqual(1)
  })

  test('should render an empty span when an error occured', () => {
    const wrapper = shallow(<Board {...props} error="sample error" />)
    expect(wrapper.html()).toEqual('<span></span>')
  })

  test('should render a "no lists found" text when nothing is availalbe', () => {
    const wrapper = shallow(<Board {...props} lists={[]} />)
    expect(wrapper.find(Typography).length).toEqual(1)
    expect(
      wrapper
        .find(Typography)
        .children()
        .text(),
    ).toEqual('No matching list(s) found')
  })

  test('should render a TrelloCardsList', () => {
    const wrapper = shallow(<Board {...props} />)
    expect(wrapper.find(TrelloCardsList).length).toEqual(1)
  })

  test('should pass the correct properties to the rendered TrelloCardsList', () => {
    const wrapper = shallow(<Board {...props} />)
    expect(wrapper.find(TrelloCardsList).props()).toMatchObject(props.lists[0])
  })
})
