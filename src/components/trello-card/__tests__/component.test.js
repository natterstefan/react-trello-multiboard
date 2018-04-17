import React from 'react'
import { mount, shallow } from 'enzyme'
import { merge } from 'lodash'

import TrelloCard, { TrelloCardIframe } from '../component'

import { props } from '../__mocks__/props'

describe('Component/TrelloCard', () => {
  test('should render without throwing an error', () => {
    expect(mount(<TrelloCard {...props} />)).toMatchSnapshot()
  })

  test('should render with display:none when isHidden', () => {
    const wrapper = shallow(<TrelloCard {...props} isHidden />)
    const div = wrapper.find('div.card')
    expect(div.length).toBe(1)
    expect(div.first().prop('style')).toMatchObject({ display: 'none' })
  })

  test('should calculate the member classnames properly', () => {
    const wrapper = shallow(<TrelloCard {...props} />)
    const instance = wrapper.instance()
    expect(instance.getMemberClass()).toBe('member_mb1 member_mb2')
  })

  test('should be selectable by class "member_mb1"', () => {
    expect(shallow(<TrelloCard {...props} />).is('.member_mb1')).toBe(true)
  })

  test('should contain a div container, where trello later appends a card to', () => {
    const wrapper = mount(<TrelloCard {...props} />)
    expect(wrapper.find('div#card_id-1')).toHaveLength(1)
    expect(wrapper.find(TrelloCardIframe)).toHaveLength(1)
  })

  test('should add default estimations to redux by invoking addEstimations prop function', () => {
    const addEstimations = jest.fn()
    shallow(<TrelloCard {...props} addEstimations={addEstimations} />)
    expect(addEstimations).toHaveBeenCalledTimes(1)
    expect(addEstimations).toBeCalledWith({ consumed: 0, estimated: 0 })
  })

  test('should add estimations to it addEstimations prop function', () => {
    const newProps = merge({}, props, {
      addEstimations: jest.fn(),
      card: {
        name: 'example-name (5)[1]',
      },
      config: {
        estimates_with_round_brackets: true,
        estimates_with_square_brackets: true,
      },
    })
    shallow(<TrelloCard {...newProps} />)
    expect(newProps.addEstimations).toHaveBeenCalledTimes(1)
    expect(newProps.addEstimations).toBeCalledWith({ consumed: 1, estimated: 5 })
  })

  test('should add only valid estimations to it addEstimations prop function', () => {
    const newProps = merge({}, props, {
      addEstimations: jest.fn(),
      card: {
        name: 'example-name (5)[xx]',
      },
      config: {
        estimates_with_round_brackets: true,
        estimates_with_square_brackets: true,
      },
    })
    shallow(<TrelloCard {...newProps} />)
    expect(newProps.addEstimations).toHaveBeenCalledTimes(1)
    expect(newProps.addEstimations).toBeCalledWith({ consumed: 0, estimated: 5 })
  })

  test('should add only valid estimations to it addEstimations prop function', () => {
    console.error = jest.genMockFunction() // disable propTypes warning
    const newProps = merge({}, props, {
      addEstimations: jest.fn(),
      card: {
        name: null,
      },
      config: {
        estimates_with_round_brackets: true,
        estimates_with_square_brackets: true,
      },
    })
    shallow(<TrelloCard {...newProps} />)
    expect(newProps.addEstimations).toHaveBeenCalledTimes(1)
    expect(newProps.addEstimations).toBeCalledWith({ consumed: 0, estimated: 0 })
  })
})

describe('Component/TrelloCardIframe', () => {
  let spyOnCreateCard
  let spyOnLoad
  let spyOnResize

  beforeEach(() => {
    spyOnCreateCard = jest.spyOn(TrelloCardIframe.prototype, 'createCard')
    spyOnLoad = jest.spyOn(TrelloCardIframe.prototype, 'onLoad')
    spyOnResize = jest.spyOn(TrelloCardIframe.prototype, 'onResize')

    jest.useFakeTimers()
  })

  afterEach(() => {
    spyOnCreateCard.mockRestore()
    spyOnLoad.mockRestore()
    spyOnResize.mockRestore()

    jest.clearAllTimers()
  })

  test('createCard return false when window.TrelloCards is not available', () => {
    const oldTrelloCards = window.TrelloCards
    window.TrelloCards = { create: jest.fn() }
    const wrapper = shallow(<TrelloCardIframe cardId={props.card.id} />)
    const instance = wrapper.instance()

    expect(spyOnCreateCard).toHaveBeenCalledTimes(1)
    expect(window.TrelloCards.create).toHaveBeenCalledTimes(1)
    expect(instance.createCard()).toBe(true)

    window.TrelloCards = oldTrelloCards
  })

  test('createCard return false when window.TrelloCards is not available', () => {
    const oldTrelloCards = window.TrelloCards
    window.TrelloCards = null

    const wrapper = shallow(<TrelloCardIframe cardId={props.card.id} />)
    const instance = wrapper.instance()
    expect(spyOnCreateCard).toHaveBeenCalledTimes(1)
    expect(instance.createCard()).toBe(false)
    window.TrelloCards = oldTrelloCards
  })

  test("should change it's state when the iframe reports a new one onLoad", () => {
    const wrapper = shallow(<TrelloCardIframe cardId={props.card.id} />)
    expect(wrapper.state()).toMatchObject({ height: 0 })

    // Fast-forward until all timers have been executed
    jest.runAllTimers()
    expect(spyOnCreateCard).toHaveBeenCalledTimes(1)
    expect(spyOnLoad).toHaveBeenCalledTimes(1)
    expect(wrapper.state()).toMatchObject({ height: 110 })
  })

  test('onLoad should not change the height when the new height is <= 0 (or not available at least)', () => {
    const oldTrelloCards = window.TrelloCards
    window.TrelloCards = null

    const wrapper = shallow(<TrelloCardIframe cardId={props.card.id} />)
    const instance = wrapper.instance()
    window.TrelloCards = oldTrelloCards

    const mockEvt = { path: [{ clientHeight: 0 }] } // usually provided by Trello
    expect(instance.onLoad(mockEvt)).toBe(false)
  })

  test("should change it's state when the iframe reports a new one onResize", () => {
    const wrapper = shallow(<TrelloCardIframe cardId={props.card.id} />)
    expect(wrapper.state()).toMatchObject({ height: 0 })

    // Fast-forward until all timers have been executed
    jest.runAllTimers()
    expect(spyOnResize).toHaveBeenCalledTimes(1)
    expect(wrapper.state()).toMatchObject({ height: 110 })
  })

  test('onResize should not change the height when the new height is <= 0 (or not available at least)', () => {
    const oldTrelloCards = window.TrelloCards
    window.TrelloCards = null

    const wrapper = shallow(<TrelloCardIframe cardId={props.card.id} />)
    const instance = wrapper.instance()
    window.TrelloCards = oldTrelloCards

    const mockDim = { height: 0 } // usually provided by Trello
    expect(instance.onResize(mockDim)).toBe(false)
  })
})
