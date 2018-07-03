import React from 'react'
import { shallow } from 'enzyme'
import { assign } from 'lodash'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import ListTabs from '../component'

const props = {
  classes: {},
  changeListToggle: jest.fn(),
  listsConfig: ['list-1', 'list-2'],
  toggleList: 'list-1',
}

describe('Component/ListTabs', () => {
  beforeEach(() => {
    props.changeListToggle.mockReset()
  })

  test('should render without throwing an error', () => {
    const wrapper = shallow(<ListTabs {...props} />).dive()
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find(Tabs).length).toEqual(1)
    expect(wrapper.find(Tab).length).toEqual(2)
  })

  test('should render null when no listsConfig is available', () => {
    const newProps = assign({}, props, { listsConfig: [] })
    expect(
      shallow(<ListTabs {...newProps} />)
        .dive()
        .html(),
    ).toEqual(null)
  })

  test('changes of a Tab should call handleChange', () => {
    const wrapper = shallow(<ListTabs {...props} />).dive()
    wrapper
      .find(Tabs)
      .first()
      .simulate('change', null, 0)
    expect(props.changeListToggle).toHaveBeenCalledTimes(1)
    expect(props.changeListToggle).toHaveBeenCalledWith('list-1')
  })

  test('should render empty html when no listsConfig is available', () => {
    const newProps = assign({}, props, { listsConfig: [] })
    expect(shallow(<ListTabs {...newProps} />).html()).toEqual('')
  })
})
