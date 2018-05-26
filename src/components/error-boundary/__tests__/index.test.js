import React from 'react'
import { shallow } from 'enzyme'

import ErrorBoundary from '../index'

const Child = () => <span>Child</span>

// const ProblemChild = () => {
//   const throwError = () => { throw new Error('Throw Error') }
//   return <button onClick={throwError} title='Throw Error!' />
// }

describe('Component/ErrorBoundary', () => {
  test('should render without throwing an error', () => {
    const wrapper = shallow(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>,
    )
    expect(wrapper.length).toBe(1)
  })

  test('should render a children', () => {
    const wrapper = shallow(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>,
    )
    expect(wrapper.find(Child).length).toBe(1)
  })

  test('should render "Something went wrong" details when an error occured', () => {
    const wrapper = shallow(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>,
    )
    wrapper.setState({ hasError: true, error: 'error-1', errorInfo: 'errorInfo-1' })
    expect(wrapper).toMatchSnapshot()
  })

  test('should invoke onError when an error occured', () => {
    const onError = jest.fn()
    const wrapper = shallow(
      <ErrorBoundary onError={onError}>
        <Child />
      </ErrorBoundary>,
    )
    wrapper.setState({ hasError: true, error: 'error-1', errorInfo: 'errorInfo-1' })
    expect(onError).toHaveBeenCalledTimes(1)
    expect(onError).toBeCalledWith('error-1', 'errorInfo-1')
  })

  // https://stackoverflow.com/a/43284406/1238150
  // https://github.com/airbnb/enzyme/issues/1255#issuecomment-352529487
  test.skip('should change the state in componentDidCatch', () => {})
})
