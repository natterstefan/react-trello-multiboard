import React from 'react'
import { mount, shallow } from 'enzyme'
import { merge } from 'lodash'

import TrelloCard from '../component'
import TrelloCardUi from '../card'

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
    expect(instance.getMemberClass()).toBe('member_member-1 member_member-2')
  })

  test('should be selectable by class "member_member-1"', () => {
    expect(shallow(<TrelloCard {...props} />).is('.member_member-1')).toBe(true)
  })

  test('should contain a div container, where a TrelloCardUi is rendered into', () => {
    const wrapper = mount(<TrelloCard {...props} />)
    expect(wrapper.find('div#card_id-1')).toHaveLength(1)
    expect(wrapper.find(TrelloCardUi)).toHaveLength(1)
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
    console.error = jest.fn() // disable propTypes warning
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
