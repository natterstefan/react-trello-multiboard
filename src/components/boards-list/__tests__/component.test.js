import React from 'react'
import { shallow } from 'enzyme'
import { LinearProgress } from 'material-ui/Progress'

import BoardsList from '../component'
import Board from '../../board'

const props = {
  error: null,
  boards: [
    {
      board: {
        name: 'Member 1',
      },
      config: {},
    },
  ],
  isLoading: false,
}

describe('Component/BoardsList', () => {
  test('should render without throwing an error', () => {
    expect(shallow(<BoardsList {...props} />)).toMatchSnapshot()
  })

  test('should render an LinearProgress when component is waiting for loading data to finish', () => {
    const wrapper = shallow(<BoardsList {...props} isLoading />)
    expect(wrapper.find(LinearProgress).length).toEqual(1)
  })

  test('should render an empty span when an error occured', () => {
    const wrapper = shallow(<BoardsList {...props} error="sample error" />)
    expect(wrapper.html()).toEqual('<span></span>')
  })

  test('should render a Board', () => {
    const wrapper = shallow(<BoardsList {...props} />)
    expect(wrapper.find(Board).length).toEqual(1)
  })

  test('should pass the correct properties to the rendered Board', () => {
    const wrapper = shallow(<BoardsList {...props} />)
    expect(wrapper.find(Board).props()).toMatchObject({ board: { name: 'Member 1' }, config: {} })
  })
})
