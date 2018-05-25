import React from 'react'
import { shallow } from 'enzyme'
import { merge } from 'lodash'

import LinearProgress from '@material-ui/core/LinearProgress'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

import { mockEampleUser1 } from '../../../__mocks__/mocks'

import Member from '../component'
import UserAvatar from '../user-avatar'

const props = {
  doTogglePreferredMember: jest.fn(),
  error: null,
  estimations: {
    consumed: 0,
    estimated: 0,
  },
  isActive: false,
  isLoading: false,
  member: mockEampleUser1,
}

describe('Component/Member', () => {
  test('should render without throwing an error', () => {
    expect(shallow(<Member {...props} />).dive()).toMatchSnapshot()
  })

  test('should render an UserAvatar per Member', () => {
    const wrapper = shallow(<Member {...props} />).dive()
    expect(wrapper.find(UserAvatar).length).toEqual(1)
  })

  test('should render a LinearProgress when component is waiting for loading data to finish', () => {
    const wrapper = shallow(<Member {...props} isLoading />).dive()
    expect(wrapper.find(LinearProgress).length).toEqual(1)
  })

  test('should render an empty span when an error occured', () => {
    const wrapper = shallow(<Member {...props} error="sample error" />).dive()
    expect(wrapper.html()).toEqual('<span></span>')
  })

  test('should change the styles of the Card and Typography when member isActive', () => {
    const wrapper = shallow(<Member {...props} isActive />).dive()
    expect(wrapper.find(Card).prop('style')).toMatchObject({ backgroundColor: '#3f51b5' })
    expect(wrapper.find(Typography).prop('style')).toMatchObject({ color: '#fff' })
  })

  test('should render no estimations if they are not available', () => {
    const newProps = merge({}, props, {
      estimations: null,
    })
    const wrapper = shallow(<Member {...newProps} />).dive()
    expect(wrapper.find('.member_card_member-1--estimations').length).toEqual(0)
  })

  test('should render estimations.consumed=0 when they are not available', () => {
    const newProps = merge({}, props, {
      estimations: {
        estimated: 2,
      },
    })
    const wrapper = shallow(<Member {...newProps} />).dive()
    const expectedSpan = '<span class="member_card_member-1--estimations">(2)[0]</span>'
    expect(wrapper.find('.member_card_member-1--estimations').html()).toEqual(expectedSpan)
  })

  test('should invoke doTogglePreferredMember when the Card is clicked', () => {
    const doTogglePreferredMember = jest.fn()
    const wrapper = shallow(
      <Member {...props} doTogglePreferredMember={doTogglePreferredMember} />,
    ).dive()
    wrapper.find('.member_card_member-1').simulate('click')
    expect(doTogglePreferredMember).toHaveBeenCalledTimes(1)
  })
})
