import * as pkg from '../../../../package.json'
import { reducer as app } from '../'

describe('reducers/info', () => {
  const initialState = {
    version: pkg.version,
    name: pkg.name,
  }

  test('returns the state', () => {
    const testState = app()
    expect(testState).toMatchObject(initialState)
  })
})
