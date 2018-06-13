import React from 'react'
import { shallow } from 'enzyme'
import { omit } from 'lodash'

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
      pattern: 'pattern-1',
    },
  ],
  isLoading: false,
  toggleList: 'pattern-1',
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
    const wrapper = shallow(<Board {...props} error={{ message: 'sample error' }} />)
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
    expect(wrapper.find(TrelloCardsList).props()).toMatchObject(omit(props.lists[0], ['pattern']))
  })

  test('should not loadCards once mounted by default', () => {
    const loadLists = jest.fn()
    shallow(<Board {...props} loadLists={loadLists} />)
    expect(loadLists).toHaveBeenCalledTimes(0)
  })

  test('should loadLists once mounted and shouldUpdate is true', () => {
    const loadLists = jest.fn()
    shallow(<Board {...props} loadLists={loadLists} shouldUpdate />)
    expect(loadLists).toHaveBeenCalledTimes(1)
  })

  test('should loadLists once mounted and no cards are loaded (available)', () => {
    const loadLists = jest.fn()
    shallow(<Board {...props} loadLists={loadLists} lists={[]} />)
    expect(loadLists).toHaveBeenCalledTimes(1)
  })
})
