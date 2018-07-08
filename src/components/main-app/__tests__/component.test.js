// Docs about withStyles tests:
// -> https://github.com/mui-org/material-ui/issues/9266#issuecomment-349447137
//    Note: createShallow should work, but did not as expected. Use shallow().dive()
//    instead (2018-04-02)
import React from 'react'
import { shallow } from 'enzyme'
import LinearProgress from '@material-ui/core/LinearProgress'

import MainApp from '../component'
import EstimationCard from '../../estimation-card'
import BoardsList from '../../boards-list'
import MembersList from '../../members-list'
import Notification from '../../notification'

describe('Component/MainApp', () => {
  const props = {
    app: {
      memberToggle: {
        togglePreferred: false,
        togglePreferredMember: null,
      },
    },
    authorize: jest.fn(),
    doTogglePreferred: jest.fn(),
    error: null,
    isAppLoading: false,
    isLoading: false,
    isMembersLoading: false,
    loadBoards: jest.fn(),
    reloadBoards: jest.fn(),
    loadPreferredMembers: jest.fn(),
  }

  beforeEach(() => {
    props.authorize.mockReset()
    props.doTogglePreferred.mockReset()
    props.loadBoards.mockReset()
    props.reloadBoards.mockReset()
    props.loadPreferredMembers.mockReset()
  })

  test('should render without throwing an error', () => {
    const wrapper = shallow(<MainApp {...props} />).dive()
    expect(wrapper.find(EstimationCard).length).toEqual(0) // only visible after toggle
    expect(wrapper.find(Notification).length).toEqual(1)
    expect(wrapper.find(BoardsList).length).toEqual(1)
    expect(wrapper.find(MembersList).length).toEqual(1)
    expect(wrapper).toMatchSnapshot()
  })

  test('should have an initial state', () => {
    const wrapper = shallow(<MainApp {...props} />).dive()
    expect(wrapper.state()).toEqual({ showEstimationCard: false, showOptions: false })
  })

  test('should show EstimationCard when toggled', () => {
    const wrapper = shallow(<MainApp {...props} />).dive()
    expect(wrapper.find(EstimationCard).length).toEqual(0)
    wrapper.setState({
      showEstimationCard: true,
    })
    wrapper.update()
    expect(wrapper.find(EstimationCard).length).toEqual(1)
  })

  test('should render an LinearProgress when isLoading is true', () => {
    const wrapper = shallow(<MainApp {...props} isLoading />).dive()
    expect(wrapper.find(LinearProgress).length).toEqual(1)
  })

  test('should render an LinearProgress when isAppLoading is true', () => {
    const wrapper = shallow(<MainApp {...props} isAppLoading />).dive()
    expect(wrapper.find(LinearProgress).length).toEqual(1)
  })

  test('should invoke authorize when mounted', () => {
    shallow(<MainApp {...props} />).dive()
    expect(props.authorize).toHaveBeenCalledTimes(1)
  })

  test('should invoke loadBoards when all members are loaded', () => {
    const wrapper = shallow(<MainApp {...props} />).dive()
    expect(props.loadBoards).toHaveBeenCalledTimes(0)

    // let's pretend members were fully loaded
    wrapper.setProps({
      isMembersLoading: true,
    })
    wrapper.update()
    expect(props.loadBoards).toHaveBeenCalledTimes(1)
  })

  test('should change showOptions state when showOptions button was pressed', () => {
    const wrapper = shallow(<MainApp {...props} />).dive()
    expect(wrapper.state()).toMatchObject({ showOptions: false })

    wrapper.find('#showOptions').simulate('click')
    expect(wrapper.state()).toMatchObject({ showOptions: true })
  })

  test('should not show options buttons when state.showOptions is false', () => {
    const wrapper = shallow(<MainApp {...props} />).dive()
    expect(wrapper.find('#togglePreferredButton')).toHaveLength(0)
    expect(wrapper.find('#showEstimationCard')).toHaveLength(0)
    expect(wrapper.find('#doResetButton')).toHaveLength(0)
  })

  test('should show options buttons when state.showOptions is true', () => {
    const wrapper = shallow(<MainApp {...props} />).dive()
    wrapper.setState({ showOptions: true })
    expect(wrapper.find('#togglePreferredButton')).toHaveLength(1)
    expect(wrapper.find('#showEstimationCard')).toHaveLength(1)
    expect(wrapper.find('#doResetButton')).toHaveLength(1)
  })

  test('should invoke doTogglePreferred when Toggle Preferred Button was clicked and change togglePreferred', () => {
    const wrapper = shallow(<MainApp {...props} />).dive()
    wrapper.setState({ showOptions: true })
    wrapper.find('#togglePreferredButton').simulate('click')

    expect(props.doTogglePreferred).toHaveBeenCalledTimes(1)
    expect(props.doTogglePreferred).toHaveBeenCalledWith(true) // switched from false, see props

    wrapper.setProps({
      app: {
        memberToggle: {
          togglePreferred: true,
        },
      },
    })
    wrapper.update()
    wrapper.find('#togglePreferredButton').simulate('click')
    expect(props.doTogglePreferred).toHaveBeenCalledWith(false)
  })

  test('should invoke resetBoards when Toggle Refresh Boards Button was clicked', () => {
    const wrapper = shallow(<MainApp {...props} />).dive()
    wrapper.setState({ showOptions: true })
    wrapper.find('#doResetButton').simulate('click')

    expect(props.reloadBoards).toHaveBeenCalledTimes(1)
    expect(props.loadPreferredMembers).toHaveBeenCalledTimes(1)
  })

  test('should change the state.showEstimationCard when the EstimationCard Button was clicked', () => {
    const wrapper = shallow(<MainApp {...props} />).dive()
    expect(wrapper.state()).toMatchObject({ showEstimationCard: false })

    wrapper.setState({ showOptions: true })
    wrapper.find('#showEstimationCard').simulate('click')

    expect(wrapper.state()).toMatchObject({ showEstimationCard: true })
  })
})
