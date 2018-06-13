import React from 'react'
import { shallow } from 'enzyme'
import { props } from '../__mocks__/trello-card'

import TrelloCardIframe from '../iframe'

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
