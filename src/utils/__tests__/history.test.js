import { createHashHistory } from 'history'
import history from '../history'

describe('utils/history', () => {
  test('exports a hashHistory', () => {
    expect(JSON.stringify(history)).toEqual(JSON.stringify(createHashHistory()))
  })
})
