import React from 'react'
import { shallow } from 'enzyme'

import MembersList from '../component'
import Member from '../../member'

const props = {
  members: {
    members: [{ id: 'mb1', username: 'user-1' }, { id: 'mb2', username: 'user-2' }],
    mb1: {
      data: {
        preferred: true,
      },
    },
    mb2: {
      data: {
        preferred: false,
      },
    },
  },
}

describe('Component/MembersList', () => {
  test('should render without throwing an error', () => {
    expect(shallow(<MembersList {...props} />).dive()).toMatchSnapshot()
  })

  test('should render only one Member (only one is preferred)', () => {
    const wrapper = shallow(<MembersList {...props} />).dive()
    expect(wrapper.find(Member).length).toEqual(1)
  })

  test('should pass the correct properties to the rendered Member', () => {
    const wrapper = shallow(<MembersList {...props} />).dive()
    expect(wrapper.find(Member).props()).toEqual({ memberId: 'mb1' })
  })
})
