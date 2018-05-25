import React from 'react'
import { shallow } from 'enzyme'
import Avatar from '@material-ui/core/Avatar'

import { mockEampleUser1, mockEampleUser3 } from '../../../__mocks__/mocks'

import UserAvatar from '../user-avatar'

const props = {
  member: {
    ...mockEampleUser1,
    avatarImg: 'http://example.com/avatar.jpg',
  },
}

describe('Component/UserAvatar', () => {
  test('should render without throwing an error', () => {
    expect(shallow(<UserAvatar {...props} />).dive()).toMatchSnapshot()
  })

  test('should render an user w/o an avatar without throwing an error', () => {
    expect(shallow(<UserAvatar member={mockEampleUser3} />).dive()).toMatchSnapshot()
  })

  test('should render an Avatar', () => {
    const wrapper = shallow(<UserAvatar {...props} />).dive()
    expect(wrapper.find(Avatar).length).toEqual(1)
  })
})
