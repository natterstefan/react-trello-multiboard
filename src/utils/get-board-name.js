import { findIndex, get } from 'lodash'
import Config from '../../config'

export const getBoardName = (name = '') => {
  const index = findIndex(Config.boards, b => b.board === name)
  return get(Config, `boards[${index}].shortcut`, name)
}
