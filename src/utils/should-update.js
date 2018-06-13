import { refreshCycle } from '../../config/config'

export const shouldUpdate = lastUpdate => {
  const test = new Date().getTime()
  return test - lastUpdate > refreshCycle * 60000
}
