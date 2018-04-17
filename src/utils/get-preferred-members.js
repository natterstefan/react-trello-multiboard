import { filter, get, includes, map } from 'lodash'
import Config from '../../config'

// example:
// const members: [{ id: 'mb1', username: 'exampleusername' }, { id: 'mb2', username: 'anotheruser' }],
const getPreferredMembers = members => {
  if (Config && get(Config, 'preferred_members')) {
    const preferredMembers = String(Config.preferred_members)
      .replace(/\//g, '')
      .split('|')
    const filteredMembers = filter(members, m => includes(preferredMembers, m.username))
    return map(filteredMembers, member => ({ id: member.id, username: member.username }))
  }
  return []
}

export default getPreferredMembers
