import React from 'react'
import { shallow } from 'enzyme'
import { assign } from 'lodash'

import LinearProgress from '@material-ui/core/LinearProgress'
import EstimationCard from '../component'

const props = {
  error: null,
  boards: {
    data: [
      {
        board: {
          id: 'b1',
          name: 'Board1',
        },
        estimations: {
          consumed: 1,
          estimated: 2,
        },
      },
    ],
  },
  isLoading: false,
  members: {
    members: [{ id: 'member-1' }],
    'member-1': {
      boardEstimations: {
        b1: {
          consumed: 3,
          estimated: 3,
        },
      },
    },
  },
  memberToggle: {
    togglePreferred: false,
    togglePreferredMember: null,
  },
}

describe('Component/EstimationCard', () => {
  test('should render without throwing an error', () => {
    expect(shallow(<EstimationCard {...props} />)).toMatchSnapshot()
  })

  test('should render an LinearProgress when component is waiting for loading data to finish', () => {
    const wrapper = shallow(<EstimationCard {...props} isLoading />)
    expect(wrapper.find(LinearProgress).length).toEqual(1)
  })

  test('should render an empty span when an error occured', () => {
    const wrapper = shallow(<EstimationCard {...props} error="sample error" />)
    expect(wrapper.html()).toEqual('<span></span>')
  })

  test('should render an empty span when the boards prop has no data array', () => {
    const newProps = assign({}, props, {
      boards: {
        data: [],
      },
    })
    const wrapper = shallow(<EstimationCard {...newProps} />)
    expect(wrapper.html()).toEqual('<span></span>')
  })

  test('should render estimations of a toggled member', () => {
    const memberToggle = {
      togglePreferred: true,
      togglePreferredMember: 'member-1',
    }

    const wrapper = shallow(<EstimationCard {...props} memberToggle={memberToggle} />)
    expect(wrapper.find('strong').text()).toEqual('Total: (3)[3]')
  })

  test('should render fallback estimations if the toggled member is not valid', () => {
    const memberToggle = {
      togglePreferred: true,
      togglePreferredMember: 'member-2',
    }

    const wrapper = shallow(<EstimationCard {...props} memberToggle={memberToggle} />)
    expect(wrapper.find('strong').text()).toEqual('Total: (0)[0]')
  })
})
