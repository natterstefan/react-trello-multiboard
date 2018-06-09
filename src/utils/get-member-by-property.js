import { find } from 'lodash'

export const getMemberByOneOfProperty = (members, props = [], value) =>
  find(members, m => find(props, p => m[p] === value))
