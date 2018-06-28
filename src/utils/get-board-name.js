import { findIndex, get } from 'lodash'
import Config from '../../config/config'

export const getBoardName = (name = '') => {
  const index = findIndex(Config.boards, b => b.name === name)
  return get(Config, `boards[${index}].shortcut`, name)
}
